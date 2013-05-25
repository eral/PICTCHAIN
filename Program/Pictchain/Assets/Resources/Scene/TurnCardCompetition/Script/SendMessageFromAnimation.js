#pragma strict

public var m_target:GameObject = null;

function SendMessageFromAnimation (message:String) {
	m_target.SendMessage(message, gameObject, UnityEngine.SendMessageOptions.DontRequireReceiver);
}

function BroadcastMessageFromAnimation (message:String) {
	m_target.BroadcastMessage(message, gameObject, UnityEngine.SendMessageOptions.DontRequireReceiver);
}

function SendMessageUpwardsFromAnimation (message:String) {
	m_target.SendMessageUpwards(message, gameObject, UnityEngine.SendMessageOptions.DontRequireReceiver);
}

function Awake () {
	if ((null == m_target)) {
		//Inspectorでの指定が無いなら
		//自身を対象とする
		m_target = gameObject;
	}
}


