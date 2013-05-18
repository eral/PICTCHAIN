using System.Collections.Generic;
using System.Linq;

/// <summary>
/// カード情報
/// </summary>
public class CardInfoCs {
	/// <summary>
	/// カード
	/// </summary>
	public struct CardName {
		public string card_name;
		public string category_name;
		public CardName(string card_name, string category_name) {
			this.card_name = card_name;
			this.category_name = category_name;
		}
	};

	/// <summary>
	/// コンストラクタ
	/// </summary>
	/// <param name="card_info">カード情報</param>
	/// <param name="category_info">カテゴリ情報</param>
	public CardInfoCs(string card_info, string category_info) {
		analyzeCategoryInfo(category_info);
		analyzeCardInfo(card_info);
	}

	/// <summary>
	/// カード数取得
	/// </summary>
	/// <returns>カード数</returns>
	public int GetCardMax() {
		//カードの種類≒画像の種類として、画像URLデータベースを照会する
		return this.image_url_db.Count();
	}

	/// <summary>
	/// イメージURL取得
	/// </summary>
	/// <param name="card_index">カードインデックス</param>
	/// <returns>イメージURL</returns>
	public string GetImageUrl(int card_index) {
		uint index = (uint)card_index;
		var image_urls = from p in this.image_url_db where p.index == index select p.image_url;
		return image_urls.FirstOrDefault();
	}

	/// <summary>
	/// 全カード名前取得
	/// </summary>
	/// <param name="card_index">カードインデックス</param>
	/// <returns>全カード名前(CardName[])、無ければnull</returns>
	public CardName[] GetAllCardName(int card_index) {
		CardName[] result = null;

		uint index = (uint)card_index;
		var card_names = from r in this.card_ruby_db 
						where r.card_index == index
						join n in this.name_db on r.name_index equals n.index
						join c in this.category_db on r.category_index equals c.index
						select new {index = r.name_index, name = n.name, category = c.name};
		if (0 < card_names.Count()) {
			result = new CardName[card_names.Count()];
			int i = 0;
			foreach (var card_name in card_names) {
				result[i++] = new CardName(card_name.name, card_name.category);
			}
		}
		
		return result;
	}

	/// <summary>
	/// カード名前取得
	/// </summary>
	/// <param name="card_index">カードインデックス</param>
	/// <param name="first_char">先頭の文字</param>
	/// <returns>カード名前(CardName)、無ければnull</returns>
	public CardName? GetCardName(int card_index, char first_char) {
		CardName? result = null;

		uint index = (uint)card_index;
		var card_names = from r in this.card_ruby_db 
						where r.card_index == index
						join n in this.name_db on r.name_index equals n.index
						where n.name.First() == first_char
						join c in this.category_db on r.category_index equals c.index
						select new {index = r.name_index, name = n.name, category = c.name};
		if (0 < card_names.Count()) {
			var card_name = card_names.First();
			result = new CardName(card_name.name, card_name.category);
		}
		
		return result;
	}

	/// <summary>
	/// カード名前取得
	/// </summary>
	/// <param name="card_index">カードインデックス</param>
	/// <param name="str">先頭の文字(文字列が与えられると末端の文字を使用)</param>
	/// <returns>カード名前(CardName)、無ければnull</returns>
	public CardName? GetCardName(int card_index, string str) {
		CardName? result = null;
		if (!string.IsNullOrEmpty(str)) {
			result = GetCardName(card_index, str[str.Length - 1]);
		}
		return result;
	}

	/// <summary>
	/// カテゴリ情報解析
	/// </summary>
	/// <param name="category_info">カテゴリ情報</param>
	private void analyzeCategoryInfo(string category_info) {
		if (string.IsNullOrEmpty(category_info)) {
			//空文字列なら
			throw new System.ArgumentNullException();
		}
		this.category_db = new List<CategoryRecord>();
		foreach (string line in category_info.Split(new char[]{'\r', '\n'}, System.StringSplitOptions.RemoveEmptyEntries)) {
			string[] tokens = line.Split(new char[]{','}, System.StringSplitOptions.RemoveEmptyEntries);
			if (2 == tokens.Length) {
				uint category_index = uint.Parse(tokens[0]);
				string category_name = tokens[1];
				//カテゴリデータベース登録
				this.category_db.Add(new CategoryRecord(category_index, category_name));
			}
		}
	}
	
	/// <summary>
	/// カード情報解析
	/// </summary>
	/// <param name="card_info">カード情報</param>
	private void analyzeCardInfo(string card_info) {
		if (string.IsNullOrEmpty(card_info)) {
			//空文字列なら
			throw new System.ArgumentNullException();
		}
		if (null == this.category_db) {
			//カテゴリデータベースが未構築なら
			throw new System.InvalidOperationException();
		}
		this.name_db = new List<NameRecord>();
		this.image_url_db = new List<ImageUrlRecord>();
		this.card_ruby_db = new List<CardRubyRecord>();
	
		foreach (string line in card_info.Split(new char[]{'\r', '\n'}, System.StringSplitOptions.RemoveEmptyEntries)) {
			string[] tokens = line.Split(new char[]{','});
			if (2 <= tokens.Length) {
				uint card_index = uint.Parse(tokens[0]);
				string image_url = tokens[1];
				//画像URLデータベース登録
				this.image_url_db.Add(new ImageUrlRecord(card_index, image_url));

				//読み・カテゴリ解析ループ
				for (int i = 4, i_max = tokens.Length; i < i_max; i += 2) {
					string card_name = tokens[i - 1];
					string category_name = tokens[i - 0];

					//名称解析
					analyzeCardInfoWithName(card_index, card_name, category_name);
				}
			}
		}
	}

	/// <summary>
	/// カード情報解析・名称部
	/// </summary>
	/// <param name="card_index">カードインデックス</param>
	/// <param name="card_name">カード名</param>
	/// <param name="category_name">カテゴリ名</param>
	private void analyzeCardInfoWithName(uint card_index, string card_name, string category_name) {
		if (!string.IsNullOrEmpty(card_name) || !string.IsNullOrEmpty(category_name)) {
			//名前インデックス照会
			uint name_index;
			var name_indexes = from p in this.name_db where p.name == card_name select p.index;
			if (0 < name_indexes.Count()) {
				//名前照会成功
				name_index = name_indexes.First();
			} else {
				//名前が登録されていないなら
				//登録
				name_index = (uint)this.name_db.Count();
				this.name_db.Add(new NameRecord(name_index, card_name));
			}

			//カテゴリインデックス照会
			uint category_index;
			var category_indexes = from p in this.category_db where p.name == category_name select p.index;
			if (0 < category_indexes.Count()) {
				//カテゴリ照会成功
				category_index = category_indexes.First();
			} else {
				//カテゴリが登録されていないなら
				//登録
				category_index = (uint)this.category_db.Count();
				this.category_db.Add(new CategoryRecord(category_index, category_name));
			}

			//カードルビデータベース登録
			this.card_ruby_db.Add(new CardRubyRecord(card_index, name_index, category_index));
		}
	}
	
	/// <summary>
	/// 名称レコード
	/// </summary>
	private class NameRecord {
		public uint		index;
		public string	name;
		public NameRecord(uint index, string name) {
			this.index = index;
			this.name = name;
		}
	}
	
	/// <summary>
	/// カテゴリレコード
	/// </summary>
	private class CategoryRecord {
		public uint		index;
		public string	name;
		public CategoryRecord(uint index, string name) {
			this.index = index;
			this.name = name;
		}
	}
	
	/// <summary>
	/// 画像URLレコード
	/// </summary>
	private class ImageUrlRecord {
		public uint		index;
		public string	image_url;
		public ImageUrlRecord(uint index, string image_url) {
			this.index = index;
			this.image_url = image_url;
		}
	}
	
	/// <summary>
	/// カードルビレコード
	/// </summary>
	private class CardRubyRecord {
		public uint		card_index;
		public uint		name_index;
		public uint		category_index;
		public CardRubyRecord(uint card_index, uint name_index, uint category_index) {
			this.card_index = card_index;
			this.name_index = name_index;
			this.category_index = category_index;
		}
	}
	
	private List<NameRecord>		name_db;
	private List<CategoryRecord>	category_db;
	private List<ImageUrlRecord>	image_url_db;
	private List<CardRubyRecord>	card_ruby_db;
}
