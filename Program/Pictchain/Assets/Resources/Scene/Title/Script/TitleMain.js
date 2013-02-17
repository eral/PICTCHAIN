#pragma strict

public enum SceneState
{
	Default = 0,	//Draw InputText
	MenuWindow,		//Draw MenuWindow
	Option,			//Draw Option
};

public var Title : Transform;
public var MenuWindow : Transform;
public var OptionMenu : Transform;

private var State : SceneState;
private var objTitle : GameObject;
private var objMenu : GameObject;
private var objOption : GameObject;

function Awake () {
	State = SceneState.Default;
	//Instantiate Title
	objTitle = Instantiate(Title) as GameObject;
}

function Start () {
}

function Update () {
}

function OnGUI () {
}

function ChangeState(state : SceneState)
{
	State = state;
	
	switch(State)
	{
		case SceneState.Default:
			Debug.Log("State : Default");
			break;
		case SceneState.MenuWindow:
			Debug.Log("State : MenuWindow");
			//Destroy Title
			Destroy(objTitle);
			//Instantiate MenuWindow
			objMenu = Instantiate(MenuWindow) as GameObject;
			break;
		case SceneState.Option:
			Debug.Log("State : Option");
			break;
	}
}

function GameStart()
{
	Application.LoadLevelAsync("Game");
}