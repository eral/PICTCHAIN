#pragma strict

var m_animation:Animation = null;
var m_animation_name:String = null;
var m_is_mouse_enter:boolean = false;
var m_is_mouse_down:boolean = false;
var m_is_mouse_up:boolean = false;
var m_is_mouse_button_up:boolean = false;
var m_is_trigger_enter:boolean = false;
var m_is_collison_enter:boolean = false;

function Start () {
	if (!m_animation) {
		m_animation = animation;
		if (!m_animation) {
			enabled = false;
		}
	}
}

function OnMouseEnter () {
	if (enabled && m_is_mouse_enter) {
		playAnimation();
	}
}

function OnMouseDown () {
	if (enabled && m_is_mouse_down) {
		playAnimation();
	}
}

function OnMouseUp () {
	if (enabled && m_is_mouse_up) {
		playAnimation();
	}
}

function OnMouseUpAsButton () {
	if (enabled && m_is_mouse_button_up) {
		playAnimation();
	}
}

function OnTriggerEnter () {
	if (enabled && m_is_trigger_enter) {
		playAnimation();
	}
}

function OnCollisonEnter () {
	if (enabled && m_is_collison_enter) {
		playAnimation();
	}
}


private function playAnimation () {
	if (String.IsNullOrEmpty(m_animation_name)) {
		m_animation.Play();
	} else {
		m_animation.Play(m_animation_name);;
	}
	
}
