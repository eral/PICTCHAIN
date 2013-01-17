#pragma strict

private var MenuWindow : GameObject;
private var InputText : GameObject;
private var GameStartText : GameObject;
private var OptionText : GameObject;

function Awake () {
	MenuWindow		= GameObject.Find("DummyMenuWindow");
	InputText		= GameObject.Find("DummyInputText");
	GameStartText	= GameObject.Find("DummyGameStartText");
	OptionText		= GameObject.Find("DummyOptionText");
}

function Start () {
	MenuWindow.SetActive(false);
	GameStartText.SetActive(false);
	OptionText.SetActive(false);
	
	Debug.Log("MenuWindow : " + MenuWindow);
}

function Update () {
}

function OnGUI () {
	if (Input.anyKey)
	{
		//disable "InputText" Object
		
		//enable "MenuWindow"
	}	
}