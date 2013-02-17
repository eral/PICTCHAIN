#pragma strict

//public value
var InputText : GUIText;
var PositiveSpeed = 0.1f;
var NegativeSpeed = 0.1f;

//private value
private var MainComponent : TitleMain;
private var Direction : int;

function Awake() {
	//Get MainComponent
	MainComponent = GameObject.Find("MainProcedure").GetComponent(TitleMain);
	//Debug.Log(MainComponent);
	Direction = -1;
}

function Start () {
}

function Update () {
	var alpha : float;
	alpha = InputText.material.color.a;
	if (Direction > 0)
	{
		//Debug.Log("Positive");
		alpha += PositiveSpeed * Direction;
		if (alpha >= 1.0f) Direction = -1;
	}
	else
	{
		//Debug.Log("Negative");
		alpha += NegativeSpeed * Direction;
		if (alpha <= 0.0f) Direction = 1;
	}
	
	InputText.material.color.a = alpha;
}

function OnGUI() {
	if (Input.anyKey)
	{
		MainComponent.ChangeState(SceneState.MenuWindow);
	}
}