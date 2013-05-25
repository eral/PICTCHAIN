#pragma strict

public var m_card_index:int = -1;

private var m_material:Material = null;
private var m_card_info:CardInfo = null;

function Start () {
	if (!m_card_info) {
		var obj:GameObject = GameObject.Find("CardInfo");
		m_card_info = obj.GetComponent(CardInfo);
		if (!m_card_info) {
			enabled = false;
		}
	}
	if (enabled && !m_material) {
		var mr:MeshRenderer = GetComponent(MeshRenderer);
		m_material = mr.material;
		if (!m_material) {
			enabled = false;
		}
	}
	if (enabled && (0 <= m_card_index)) {
		var card_index:int = m_card_index;
		randomCChangeCard();
		ChangeCardImage(card_index);
	}

}

function OnChangeCard () {
	if (enabled) {
		randomCChangeCard();
	}
}

function ChangeCardImage (card_index:int) {
	var image_file_name:String = m_card_info.GetImageUrl(card_index);
	
	if (!String.IsNullOrEmpty(image_file_name)) {
		var texture:Texture = Resources.Load("Share/CardInfo/Texture/" + image_file_name) as Texture;
		if (null != texture) {
			m_material.mainTexture = texture;
			m_card_index = card_index;
		}
	}
	if (null == m_material.mainTexture) {
		m_card_index = -1;
	}
}

private function randomCChangeCard () {
	var color:Color = Color.white;
	var color_depth:float = 3.0;
	color.r = Mathf.Floor(Random.value * color_depth) / (color_depth - 1.0);
	color.g = Mathf.Floor(Random.value * color_depth) / (color_depth - 1.0);
	color.b = Mathf.Floor(Random.value * color_depth) / (color_depth - 1.0);
	m_material.color = color;

	var card_index_max = m_card_info.GetCardMax();
	var next_card_index:int = Random.value * card_index_max;
	ChangeCardImage(next_card_index);
}

