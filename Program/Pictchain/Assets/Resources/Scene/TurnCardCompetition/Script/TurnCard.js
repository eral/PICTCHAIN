#pragma strict

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
}

function OnChangeCard () {
	if (enabled) {
		var color:Color = Color.white;
		var color_depth:float = 3.0;
		color.r = Mathf.Floor(Random.value * color_depth) / (color_depth - 1.0);
		color.g = Mathf.Floor(Random.value * color_depth) / (color_depth - 1.0);
		color.b = Mathf.Floor(Random.value * color_depth) / (color_depth - 1.0);
		Debug.Log("test↓");
		var card_names = m_card_info.GetAllCardName(0);
		for (card_name in card_names) {
			Debug.Log("card_name:" + card_name.card_name + ", category_name:" + card_name.category_name);
		}
		Debug.Log("test→");
		var card_name = m_card_info.GetCardName(0, 'こ');
		if (null != card_name) {
			Debug.Log("card_name:" + card_name.card_name + ", category_name:" + card_name.category_name);
		} else {
			Debug.Log("null");
		}
		Debug.Log("test↑");
		m_material.color = color;
	}
}