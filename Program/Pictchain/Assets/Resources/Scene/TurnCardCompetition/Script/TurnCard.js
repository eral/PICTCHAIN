#pragma strict

private var m_material:Material = null;

function Start () {
	if (!m_material) {
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
		m_material.color = color;
	}
}