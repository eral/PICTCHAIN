#pragma strict

function SendMessageFromAnimation (message:String) {
	SendMessage(message, gameObject, UnityEngine.SendMessageOptions.DontRequireReceiver);
}

function BroadcastMessageFromAnimation (message:String) {
	BroadcastMessage(message, gameObject, UnityEngine.SendMessageOptions.DontRequireReceiver);
}

function SendMessageUpwardsFromAnimation (message:String) {
	SendMessageUpwards(message, gameObject, UnityEngine.SendMessageOptions.DontRequireReceiver);
}
