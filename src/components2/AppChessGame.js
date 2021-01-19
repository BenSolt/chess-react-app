import React from 'react';
import "./game.css"

function AppChessGame() {

	var size = 8
	var wide = []


	for(var i = 0; i < size; i++) { 
		wide.push(i);
	}



	return (
	<div>
		<div class="option-nav">
			<div id="player-nav">
						Player: <span id="player"></span>
			</div>
			<div id="option" class="btn">
				<i class="fa fa-cog" aria-hidden="true"></i>
				<span class="tooltiptext">OPTION</span>
			</div>
			<div id="undo-btn" class="btn">
				<i class="fa fa-undo" aria-hidden="true"></i>
				<span class="tooltiptext">UNDO</span>
			</div>
		</div>
		<div id="board">
			<div id="result" class="hide"></div>
			<div id="pawn-promotion-option" class="hide">
				<span id="queen" class="option"></span>
				<span id="rook" class="option"></span>
				<span id="knight" class="option"></span>
				<span id="bishop" class="option"></span>
			</div>
			<div id="option-menu" class="hide">
				<div id="back-btn" class="button">BACK</div>
				<div id="theme-menu">
							THEME: <span id="theme-option" class="button"></span>
				</div>
				<div id="color-menu">
							COLOR: <span id="color-option" class="button"></span>
				</div>
				<div id="restart-btn" class="button">NEW GAME</div>
			</div>
			

			<div id="game" ng-app="myApp" ng-controller="GameController">
				<div class="row" ng-repeat="y in widths">
					<div class="box" ng-repeat="x in widths" ng-attr-id="{{'box-' + x + '-' + y}}" piece="">
					</div>
				</div>
			</div>
		</div>
	</div>
	)


}
export default AppChessGame;