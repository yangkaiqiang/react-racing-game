import * as THREE from "three";

 import Loader from "../utils/Loader";
 import EventEmitter from "../utils/EventEmitter";
 
 // Matcaps
 import matcapBeigeSource from "../../assets/models/matcaps/beige.png";
 import matcapBlackSource from "../../assets/models/matcaps/black.png";
 import matcapOrangeSource from "../../assets/models/matcaps/orange.png";
 import matcapRedSource from "../../assets/models/matcaps/red.png";
 import matcapWhiteSource from "../../assets/models/matcaps/white.png";
 import matcapGreenSource from "../../assets/models/matcaps/green.png";
 import matcapBrownSource from "../../assets/models/matcaps/brown.png";
 import matcapGraySource from "../../assets/models/matcaps/gray.png";
 import matcapEmeraldGreenSource from "../../assets/models/matcaps/emeraldGreen.png";
 import matcapPurpleSource from "../../assets/models/matcaps/purple.png";
 import matcapBlueSource from "../../assets/models/matcaps/blue.png";
 import matcapYellowSource from "../../assets/models/matcaps/yellow.png";
 import matcapMetalSource from "../../assets/models/matcaps/metal.png";
 
 // Intro
 import introStaticBaseSource from "../../assets/models/intro/static/base.glb";
 import introStaticCollisionSource from "../../assets/models/intro/static/collision.glb";
 import introStaticFloorShadowSource from "../../assets/models/intro/static/floorShadow.png";
 
 import introInstructionsLabelsSource from "../../assets/models/intro/instructions/labels.glb";
 import introInstructionsArrowsSource from "../../assets/models/intro/instructions/arrows.png";
 import introInstructionsControlsSource from "../../assets/models/intro/instructions/controls.png";
 import introInstructionsOtherSource from "../../assets/models/intro/instructions/other.png";
 
 import introArrowKeyBaseSource from "../../assets/models/intro/arrowKey/base.glb";
 import introArrowKeyCollisionSource from "../../assets/models/intro/arrowKey/collision.glb";
 
 import introBBaseSource from "../../assets/models/intro/b/base.glb";
 import introBCollisionSource from "../../assets/models/intro/b/collision.glb";
 
 import introRBaseSource from "../../assets/models/intro/r/base.glb";
 import introRCollisionSource from "../../assets/models/intro/r/collision.glb";
 
 import introUBaseSource from "../../assets/models/intro/u/base.glb";
 import introUCollisionSource from "../../assets/models/intro/u/collision.glb";
 
 import introNBaseSource from "../../assets/models/intro/n/base.glb";
 import introNCollisionSource from "../../assets/models/intro/n/collision.glb";
 
 import introOBaseSource from "../../assets/models/intro/o/base.glb";
 import introOCollisionSource from "../../assets/models/intro/o/collision.glb";
 
 import introSBaseSource from "../../assets/models/intro/s/base.glb";
 import introSCollisionSource from "../../assets/models/intro/s/collision.glb";
 
 import introIBaseSource from "../../assets/models/intro/i/base.glb";
 import introICollisionSource from "../../assets/models/intro/i/collision.glb";
 
 import introMBaseSource from "../../assets/models/intro/m/base.glb";
 import introMCollisionSource from "../../assets/models/intro/m/collision.glb";
 
 import introCreativeBaseSource from "../../assets/models/intro/creative/base.glb";
 import introCreativeCollisionSource from "../../assets/models/intro/creative/collision.glb";
 
 import introDevBaseSource from "../../assets/models/intro/dev/base.glb";
 import introDevCollisionSource from "../../assets/models/intro/dev/collision.glb";
 
 // Crossroads
 import crossroadsStaticFloorShadowSource from "../../assets/models/crossroads/static/floorShadow.png";
 import crossroadsStaticBaseSource from "../../assets/models/crossroads/static/base.glb";
 import crossroadsStaticCollisionSource from "../../assets/models/crossroads/static/collision.glb";
 
 // Car default
 import carDefaultChassisSource from "../../assets/models/car/default/chassis.glb";
 import carDefaultWheelSource from "../../assets/models/car/default/wheel.glb";
 import carDefaultBackLightsBrakeSource from "../../assets/models/car/default/backLightsBrake.glb";
 import carDefaultBackLightsReverseSource from "../../assets/models/car/default/backLightsReverse.glb";
 import carDefaultAntenaSource from "../../assets/models/car/default/antena.glb";
 
 // Car cyber truck
 import carCyberTruckChassisSource from "../../assets/models/car/cyberTruck/chassis.glb";
 import carCyberTruckWheelSource from "../../assets/models/car/cyberTruck/wheel.glb";
 import carCyberTruckBackLightsBrakeSource from "../../assets/models/car/cyberTruck/backLightsBrake.glb";
 import carCyberTruckBackLightsReverseSource from "../../assets/models/car/cyberTruck/backLightsReverse.glb";
 import carCyberTruckAntenaSource from "../../assets/models/car/cyberTruck/antena.glb";
 
 // Projects
 import projectsBoardStructureSource from "../../assets/models/projects/board/structure.glb";
 import projectsBoardCollisionSource from "../../assets/models/projects/board/collision.glb";
 import projectsBoardStructureFloorShadowSource from "../../assets/models/projects/board/floorShadow.png";
 import projectsBoardPlaneSource from "../../assets/models/projects/board/plane.glb";
 
 import projectsDistinctionsAwwwardsBaseSource from "../../assets/models/projects/distinctions/awwwards/base.glb";
 import projectsDistinctionsAwwwardsCollisionSource from "../../assets/models/projects/distinctions/awwwards/collision.glb";
 import projectsDistinctionsFWABaseSource from "../../assets/models/projects/distinctions/fwa/base.glb";
 import projectsDistinctionsFWACollisionSource from "../../assets/models/projects/distinctions/fwa/collision.glb";
 import projectsDistinctionsCSSDABaseSource from "../../assets/models/projects/distinctions/cssda/base.glb";
 import projectsDistinctionsCSSDACollisionSource from "../../assets/models/projects/distinctions/cssda/collision.glb";
 
 import projectsThreejsJourneyFloorSource from "../../assets/models/projects/threejsJourney/floorTexture.png";
 import projectsChartogneFloorSource from "../../assets/models/projects/chartogne/floorTexture.png";
 import projectsZenlyFloorSource from "../../assets/models/projects/zenly/floorTexture.png";
 import projectsCitrixRedbullFloorSource from "../../assets/models/projects/citrixRedbull/floorTexture.png";
 import projectsPriorHoldingsFloorSource from "../../assets/models/projects/priorHoldings/floorTexture.png";
 import projectsOranoFloorSource from "../../assets/models/projects/orano/floorTexture.png";
 import projectsGleecChatFloorSource from "../../assets/models/projects/gleecChat/floorTexture.png";
 import projectsKepplerFloorSource from "../../assets/models/projects/keppler/floorTexture.png";
 
 // Information
 import informationStaticBaseSource from "../../assets/models/information/static/base.glb";
 import informationStaticCollisionSource from "../../assets/models/information/static/collision.glb";
 import informationStaticFloorShadowSource from "../../assets/models/information/static/floorShadow.png";
 
 import informationBaguetteBaseSource from "../../assets/models/information/baguette/base.glb";
 import informationBaguetteCollisionSource from "../../assets/models/information/baguette/collision.glb";
 
 import informationContactTwitterLabelSource from "../../assets/models/information/static/contactTwitterLabel.png";
 import informationContactGithubLabelSource from "../../assets/models/information/static/contactGithubLabel.png";
 import informationContactLinkedinLabelSource from "../../assets/models/information/static/contactLinkedinLabel.png";
 import informationContactMailLabelSource from "../../assets/models/information/static/contactMailLabel.png";
 
 import informationActivitiesSource from "../../assets/models/information/static/activities.png";
 
 // Playground
 import playgroundStaticFloorShadowSource from "../../assets/models/playground/static/floorShadow.png";
 import playgroundStaticBaseSource from "../../assets/models/playground/static/base.glb";
 import playgroundStaticCollisionSource from "../../assets/models/playground/static/collision.glb";
 
 // Brick
 import brickBaseSource from "../../assets/models/brick/base.glb";
 import brickCollisionSource from "../../assets/models/brick/collision.glb";
 
 // Horn
 import hornBaseSource from "../../assets/models/horn/base.glb";
 import hornCollisionSource from "../../assets/models/horn/collision.glb";
 
 // Awwwards trophy
 import webbyTrophyBaseSource from "../../assets/models/webbyTrophy/base.glb";
 import webbyTrophyCollisionSource from "../../assets/models/webbyTrophy/collision.glb";
 
 // Lemon
 import lemonBaseSource from "../../assets/models/lemon/base.glb";
 import lemonCollisionSource from "../../assets/models/lemon/collision.glb";
 
 // Bowling ball
 import bowlingBallBaseSource from "../../assets/models/bowlingBall/base.glb";
 import bowlingBallCollisionSource from "../../assets/models/bowlingBall/collision.glb";
 
 // Bowling pin
 import bowlingPinBaseSource from "../../assets/models/bowlingPin/base.glb";
 import bowlingPinCollisionSource from "../../assets/models/bowlingPin/collision.glb";
 
 // Area
 import areaKeyEnterSource from "../../assets/models/area/keyEnter.png";
 import areaEnterSource from "../../assets/models/area/enter.png";
 import areaOpenSource from "../../assets/models/area/open.png";
 import areaResetSource from "../../assets/models/area/reset.png";
 import areaQuestionMarkSource from "../../assets/models/area/questionMark.png";
 
 // Tiles
 import tilesABaseSource from "../../assets/models/tiles/a/base.glb";
 import tilesACollisionSource from "../../assets/models/tiles/a/collision.glb";
 
 import tilesBBaseSource from "../../assets/models/tiles/b/base.glb";
 import tilesBCollisionSource from "../../assets/models/tiles/b/collision.glb";
 
 import tilesCBaseSource from "../../assets/models/tiles/c/base.glb";
 import tilesCCollisionSource from "../../assets/models/tiles/c/collision.glb";
 
 import tilesDBaseSource from "../../assets/models/tiles/d/base.glb";
 import tilesDCollisionSource from "../../assets/models/tiles/d/collision.glb";
 
 import tilesEBaseSource from "../../assets/models/tiles/e/base.glb";
 import tilesECollisionSource from "../../assets/models/tiles/e/collision.glb";
 
 // Konami
 import konamiLabelSource from "../../assets/models/konami/label.png";
 import konamiLabelTouchSource from "../../assets/models/konami/label-touch.png";
 
 // Wigs
 import wig1Source from "../../assets/models/wigs/wig1.glb";
 import wig2Source from "../../assets/models/wigs/wig2.glb";
 import wig3Source from "../../assets/models/wigs/wig3.glb";
 import wig4Source from "../../assets/models/wigs/wig4.glb";

/**
 * 资源类
 */
export default class Resources extends EventEmitter {
    constructor(){
      super();

      //加载器 加载游戏所需资源
      this.loader = new Loader()
      this.loader.load([
            // Matcaps
            { name: "matcapBeige", source: matcapBeigeSource, type: "texture" },
            { name: "matcapBlack", source: matcapBlackSource, type: "texture" },
            { name: "matcapOrange", source: matcapOrangeSource, type: "texture" },
            { name: "matcapRed", source: matcapRedSource, type: "texture" },
            { name: "matcapWhite", source: matcapWhiteSource, type: "texture" },
            { name: "matcapGreen", source: matcapGreenSource, type: "texture" },
            { name: "matcapBrown", source: matcapBrownSource, type: "texture" },
            { name: "matcapGray", source: matcapGraySource, type: "texture" },
            {
              name: "matcapEmeraldGreen",
              source: matcapEmeraldGreenSource,
              type: "texture",
            },
            { name: "matcapPurple", source: matcapPurpleSource, type: "texture" },
            { name: "matcapBlue", source: matcapBlueSource, type: "texture" },
            { name: "matcapYellow", source: matcapYellowSource, type: "texture" },
            { name: "matcapMetal", source: matcapMetalSource, type: "texture" },
      
            // Intro
            { name: "introStaticBase", source: introStaticBaseSource },
            { name: "introStaticCollision", source: introStaticCollisionSource },
            {
              name: "introStaticFloorShadow",
              source: introStaticFloorShadowSource,
              type: "texture",
            },
      
            {
              name: "introInstructionsLabels",
              source: introInstructionsLabelsSource,
            },
            {
              name: "introInstructionsArrows",
              source: introInstructionsArrowsSource,
              type: "texture",
            },
            {
              name: "introInstructionsControls",
              source: introInstructionsControlsSource,
              type: "texture",
            },
            {
              name: "introInstructionsOther",
              source: introInstructionsOtherSource,
              type: "texture",
            },
      
            { name: "introArrowKeyBase", source: introArrowKeyBaseSource },
            { name: "introArrowKeyCollision", source: introArrowKeyCollisionSource },
      
            { name: "introBBase", source: introBBaseSource },
            { name: "introBCollision", source: introBCollisionSource },
      
            { name: "introRBase", source: introRBaseSource },
            { name: "introRCollision", source: introRCollisionSource },
      
            { name: "introUBase", source: introUBaseSource },
            { name: "introUCollision", source: introUCollisionSource },
      
            { name: "introNBase", source: introNBaseSource },
            { name: "introNCollision", source: introNCollisionSource },
      
            { name: "introOBase", source: introOBaseSource },
            { name: "introOCollision", source: introOCollisionSource },
      
            { name: "introSBase", source: introSBaseSource },
            { name: "introSCollision", source: introSCollisionSource },
      
            { name: "introIBase", source: introIBaseSource },
            { name: "introICollision", source: introICollisionSource },
      
            { name: "introMBase", source: introMBaseSource },
            { name: "introMCollision", source: introMCollisionSource },
      
            { name: "introCreativeBase", source: introCreativeBaseSource },
            { name: "introCreativeCollision", source: introCreativeCollisionSource },
      
            { name: "introDevBase", source: introDevBaseSource },
            { name: "introDevCollision", source: introDevCollisionSource },
      
            // Intro
            { name: "crossroadsStaticBase", source: crossroadsStaticBaseSource },
            {
              name: "crossroadsStaticCollision",
              source: crossroadsStaticCollisionSource,
            },
            {
              name: "crossroadsStaticFloorShadow",
              source: crossroadsStaticFloorShadowSource,
              type: "texture",
            },
      
            // Car default
            { name: "carDefaultChassis", source: carDefaultChassisSource },
            { name: "carDefaultWheel", source: carDefaultWheelSource },
            {
              name: "carDefaultBackLightsBrake",
              source: carDefaultBackLightsBrakeSource,
            },
            {
              name: "carDefaultBackLightsReverse",
              source: carDefaultBackLightsReverseSource,
            },
            { name: "carDefaultAntena", source: carDefaultAntenaSource },
      
            // Car default
            { name: "carCyberTruckChassis", source: carCyberTruckChassisSource },
            { name: "carCyberTruckWheel", source: carCyberTruckWheelSource },
            {
              name: "carCyberTruckBackLightsBrake",
              source: carCyberTruckBackLightsBrakeSource,
            },
            {
              name: "carCyberTruckBackLightsReverse",
              source: carCyberTruckBackLightsReverseSource,
            },
            { name: "carCyberTruckAntena", source: carCyberTruckAntenaSource },
      
            // Project
            { name: "projectsBoardStructure", source: projectsBoardStructureSource },
            { name: "projectsBoardCollision", source: projectsBoardCollisionSource },
            {
              name: "projectsBoardStructureFloorShadow",
              source: projectsBoardStructureFloorShadowSource,
              type: "texture",
            },
            { name: "projectsBoardPlane", source: projectsBoardPlaneSource },
      
            {
              name: "projectsDistinctionsAwwwardsBase",
              source: projectsDistinctionsAwwwardsBaseSource,
            },
            {
              name: "projectsDistinctionsAwwwardsCollision",
              source: projectsDistinctionsAwwwardsCollisionSource,
            },
            {
              name: "projectsDistinctionsFWABase",
              source: projectsDistinctionsFWABaseSource,
            },
            {
              name: "projectsDistinctionsFWACollision",
              source: projectsDistinctionsFWACollisionSource,
            },
            {
              name: "projectsDistinctionsCSSDABase",
              source: projectsDistinctionsCSSDABaseSource,
            },
            {
              name: "projectsDistinctionsCSSDACollision",
              source: projectsDistinctionsCSSDACollisionSource,
            },
      
            {
              name: "projectsThreejsJourneyFloor",
              source: projectsThreejsJourneyFloorSource,
              type: "texture",
            },
            {
              name: "projectsChartogneFloor",
              source: projectsChartogneFloorSource,
              type: "texture",
            },
            {
              name: "projectsZenlyFloor",
              source: projectsZenlyFloorSource,
              type: "texture",
            },
            {
              name: "projectsCitrixRedbullFloor",
              source: projectsCitrixRedbullFloorSource,
              type: "texture",
            },
            {
              name: "projectsPriorHoldingsFloor",
              source: projectsPriorHoldingsFloorSource,
              type: "texture",
            },
            {
              name: "projectsOranoFloor",
              source: projectsOranoFloorSource,
              type: "texture",
            },
            {
              name: "projectsGleecChatFloor",
              source: projectsGleecChatFloorSource,
              type: "texture",
            },
            {
              name: "projectsKepplerFloor",
              source: projectsKepplerFloorSource,
              type: "texture",
            },
      
            // Information
            { name: "informationStaticBase", source: informationStaticBaseSource },
            {
              name: "informationStaticCollision",
              source: informationStaticCollisionSource,
            },
            {
              name: "informationStaticFloorShadow",
              source: informationStaticFloorShadowSource,
              type: "texture",
            },
      
            {
              name: "informationBaguetteBase",
              source: informationBaguetteBaseSource,
            },
            {
              name: "informationBaguetteCollision",
              source: informationBaguetteCollisionSource,
            },
      
            {
              name: "informationContactTwitterLabel",
              source: informationContactTwitterLabelSource,
              type: "texture",
            },
            {
              name: "informationContactGithubLabel",
              source: informationContactGithubLabelSource,
              type: "texture",
            },
            {
              name: "informationContactLinkedinLabel",
              source: informationContactLinkedinLabelSource,
              type: "texture",
            },
            {
              name: "informationContactMailLabel",
              source: informationContactMailLabelSource,
              type: "texture",
            },
      
            {
              name: "informationActivities",
              source: informationActivitiesSource,
              type: "texture",
            },
      
            // Playground
            { name: "playgroundStaticBase", source: playgroundStaticBaseSource },
            {
              name: "playgroundStaticCollision",
              source: playgroundStaticCollisionSource,
            },
            {
              name: "playgroundStaticFloorShadow",
              source: playgroundStaticFloorShadowSource,
              type: "texture",
            },
      
            // Brick
            { name: "brickBase", source: brickBaseSource },
            { name: "brickCollision", source: brickCollisionSource },
      
            // Horn
            { name: "hornBase", source: hornBaseSource },
            { name: "hornCollision", source: hornCollisionSource },
      
            // Webby trophy
            { name: "webbyTrophyBase", source: webbyTrophyBaseSource },
            { name: "webbyTrophyCollision", source: webbyTrophyCollisionSource },
      
            // Lemon
            { name: "lemonBase", source: lemonBaseSource },
            { name: "lemonCollision", source: lemonCollisionSource },
      
            // Bownling ball
            { name: "bowlingBallBase", source: bowlingBallBaseSource },
            { name: "bowlingBallCollision", source: bowlingBallCollisionSource },
      
            // Bownling ball
            { name: "bowlingPinBase", source: bowlingPinBaseSource },
            { name: "bowlingPinCollision", source: bowlingPinCollisionSource },
      
            // Areas
            { name: "areaKeyEnter", source: areaKeyEnterSource, type: "texture" },
            { name: "areaEnter", source: areaEnterSource, type: "texture" },
            { name: "areaOpen", source: areaOpenSource, type: "texture" },
            { name: "areaReset", source: areaResetSource, type: "texture" },
            {
              name: "areaQuestionMark",
              source: areaQuestionMarkSource,
              type: "texture",
            },
      
            // Tiles
            { name: "tilesABase", source: tilesABaseSource },
            { name: "tilesACollision", source: tilesACollisionSource },
      
            { name: "tilesBBase", source: tilesBBaseSource },
            { name: "tilesBCollision", source: tilesBCollisionSource },
      
            { name: "tilesCBase", source: tilesCBaseSource },
            { name: "tilesCCollision", source: tilesCCollisionSource },
      
            { name: "tilesDBase", source: tilesDBaseSource },
            { name: "tilesDCollision", source: tilesDCollisionSource },
      
            { name: "tilesEBase", source: tilesEBaseSource },
            { name: "tilesECollision", source: tilesECollisionSource },
      
            // Konami
            { name: "konamiLabel", source: konamiLabelSource, type: "texture" },
            {
              name: "konamiLabelTouch",
              source: konamiLabelTouchSource,
              type: "texture",
            },
      
            // Wigs
            { name: "wig1", source: wig1Source },
            { name: "wig2", source: wig2Source },
            { name: "wig3", source: wig3Source },
            { name: "wig4", source: wig4Source },
      ]);

      //每个资源加载完毕 触发进度条事件
      this.loader.on('fileEnd', (_resource, _data) => {
        // console.log(this.loader.loaded , this.loader.toLoad)
        this.trigger('progress', [this.loader.loaded / this.loader.toLoad])
      })

      //所有加载完毕 触发准备完毕事件
      this.loader.on('end', (_resource, _data) => {
        this.trigger('ready')
      })
    }
}