#pragma strict

/// <summary>
/// カード情報
/// </summary>
var m_card_info:TextAsset = null;

/// <summary>
/// カテゴリ情報
/// </summary>
var m_category_info:TextAsset = null;


/// <summary>
/// データベース構築
/// </summary>
/// <param name="card_info">カード情報</param>
/// <param name="category_info">カテゴリ情報</param>
function CreateDb(card_info:String, category_info:String) {
	try {
		m_db = new CardInfoCs(card_info, category_info);
	} catch (e) {
		ReleaseDb();
		throw new System.ArgumentException();
	}
	enabled = true;
}

/// <summary>
/// データベース破棄
/// </summary>
function ReleaseDb() {
	enabled = false;
	m_db = null;
}

/// <summary>
/// カード数取得
/// </summary>
/// <returns>カード数</returns>
function GetCardMax():int {
	var result:int = 0;
	if (enabled && (null != m_db)) {
		result = m_db.GetCardMax();
	}
	return result;
}

/// <summary>
/// イメージURL取得
/// </summary>
/// <returns>イメージURL</returns>
/// <param name="card_index">カードインデックス</param>
function GetImageUrl(card_index:int):String {
	var result:String = null;
	if (enabled && (null != m_db)) {
		result = m_db.GetImageUrl(card_index);
	}
	return result;
}

/// <summary>
/// カー名構造体
/// </summary>
class CardInfoCardName {
	var card_name:String;
	var category_name:String;
	function CardInfoCardName(card_name:String, category_name:String) {
		this.card_name = card_name;
		this.category_name = category_name;
	}
};

/// <summary>
/// 全カード名前取得
/// </summary>
/// <returns>全カード名前([{"name":<名前>, "category":カテゴリ名>}, ...]、無ければnullを返す)</returns>
/// <param name="card_index">カードインデックス</param>
function GetAllCardName(card_index:int):CardInfoCardName[] {
	var result:CardInfoCardName[] = null;
	if (enabled && (null != m_db)) {
		var card_names = m_db.GetAllCardName(card_index);
		if (null != card_names) {
			result = new CardInfoCardName[card_names.Length];
			var i:int = 0;
			for (var card_name in card_names) {
				result[i++] = CardInfoCardName(card_name.card_name, card_name.category_name);
			}
		}
	}
	return result;
}

/// <summary>
/// カード名前取得
/// </summary>
/// <param name="card_index">カードインデックス</param>
/// <param name="str">先頭の文字(2文字以上の文字列が与えられるた場合不定)</param>
/// <returns>カード名前(CardName)、無ければnull</returns>
function GetCardName(card_index:int, str:String):CardInfoCardName {
	var result:CardInfoCardName = null;
	if (enabled && (null != m_db)) {
		var card_name = m_db.GetCardName(card_index, str);
		if (null != card_name) {
			result = CardInfoCardName(card_name.Value.card_name, card_name.Value.category_name);
		}
	}
	return result;
}

/// <summary>
/// データベース
/// </summary>
private var m_db:CardInfoCs = null;

function Awake () {
	if ((null != m_card_info) && (null != m_category_info)) {
		//Inspectorでの指定が有るなら
		CreateDb(m_card_info.text, m_category_info.text);
	} else {
		//Inspectorでの指定が無いなら
		ReleaseDb();
	}
}


