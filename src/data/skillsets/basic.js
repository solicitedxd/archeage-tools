import AnabolicaIcon from 'images/skill/auramancy/Banishment.png';
import BackKickIcon from 'images/skill/basic/Back_Kick.png';
import BiteIcon from 'images/skill/basic/Bite.png';
import BoarsBoreIcon from 'images/skill/basic/Boars_Bore.png';
import BreakthroughIcon from 'images/skill/basic/Breakthough.png';
import DashIcon from 'images/skill/basic/Dash.png';
import DropBackIcon from 'images/skill/basic/Drop_Back_pet.png';
import ElegantLeapIcon from 'images/skill/basic/Elegant_Leap.png';
import MountedArrowshotIcon from 'images/skill/basic/Mounted_Arrowshot.png';
import MountedAttackIcon from 'images/skill/basic/Mounted_Attack.png';
import MountedDefenseIcon from 'images/skill/basic/Mounted_Defense.png';
import MountedFireArrowIcon from 'images/skill/basic/Mounted_Fire_Arrow.png';
import PangochargeIcon from 'images/skill/basic/Pangocharge.png';
import PatienceIcon from 'images/skill/basic/Patience.png';
import OverrunIcon from 'images/skill/basic/Overrun.png';
import OwnersEscapeIcon from 'images/skill/auramancy/Teleportation.png';
import RunIcon from 'images/skill/basic/Run.png';
import SlamIcon from 'images/skill/basic/Slam.png';
import SnipeIcon from 'images/skill/shadowplay/Ruthless_Assault.png';
import StealthMoveIcon from 'images/skill/basic/Stealth_Move.png';
import StubbornDashIcon from 'images/skill/basic/Stubborn_Dash.png';
import UnstoppableRaceIcon from 'images/skill/basic/Unstoppable_Race.png';
import WarCryIcon from 'images/skill/basic/War_Cry.png';
import { BUFF } from 'constants/skills';

export default Object.freeze([
  {
    id: 'Run',
    icon: RunIcon,
    name: 'Run!',
    cooldown: 30,
    description: 'Increases Pet Move Speed #+50%# for #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: MountedArrowshotIcon,
    name: 'Mounted Arrowshot',
    range: [0, 30],
    description: 'Fires an arrow at an enemy, dealing Physical Damage equal to #80%# of the rider\'s ranged attack.',
  },
  {
    icon: OverrunIcon,
    name: 'Overrun',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a charge that can Stun a distant enemy for #2sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: AnabolicaIcon,
    name: 'Anabolica',
    cooldown: 60,
    description: 'Increases the pet\'s and rider\'s Attack +#30%# for #30sec#.\r' +
      'Canceled if you dismount.',
  },
  {
    icon: DashIcon,
    name: 'Dash',
    cooldown: 30,
    description: 'Triggers a forward charge for #3sec# that makes you invincible. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: MountedAttackIcon,
    name: 'Mounted Attack',
    cooldown: 2,
    description: 'Deals #350%# of Melee Attack as Physical Damage with a chance of Tripping targets while mounted.',
  },
  {
    icon: DropBackIcon,
    name: 'Drop Back',
    cooldown: 18,
    description: 'Triggers a #12 m# backwards leap to escape danger.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: OwnersEscapeIcon,
    name: 'Owner\'s Escape',
    cooldown: 30,
    description: 'Teleports the rider #18 meters# forward, out of the saddle.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: StealthMoveIcon,
    name: 'Stealth Move',
    cooldown: 180,
    description: 'Stealths both mount and rider for #30 sec#.\r' +
      'Decreases Move Speed #-30%#.\r' +
      'Stealth ends if you attack or are attacked.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: SlamIcon,
    name: 'Slam',
    cooldown: 18,
    description: 'Instructs the pangolin to wind up, then smash the ground to create an earthquake. Damages all enemies within 3m and decreases their Move Speed -30% for 3 seconds.',
  },
  {
    icon: PangochargeIcon,
    name: 'Pangocharge',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a pounce that inflicts damage on a distant target and knocks it packwards (Trips for 2 seconds instead if it\'s Slowed).\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
    combos: [
      {
        buff: BUFF.SLOWED,
        causes: BUFF.TRIPPED,
        text: 'Trips targets that are ${b}.',
      },
    ],
  },
  {
    icon: StubbornDashIcon,
    name: 'Stubborn Dash',
    cooldown: 60,
    description: 'Triggers a 3 second forward roll.\r' +
      'Increases the pangolin and rider\'s Defense and Magic Defense #+5000#, and grants immunity to Fear and Slow.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: PatienceIcon,
    name: 'Patience',
    effectRange: 32,
    cooldown: 30,
    description: 'Grants defense buffs to allies within 16m for 5 seconds. Effect ends early if you dismount.',
  },
  {
    icon: BackKickIcon,
    name: 'Back Kick',
    effectRange: 4,
    castTime: 0.3,
    cooldown: 18,
    effects: [BUFF.TRIPPED],
    description: 'Strengthens the mount\'s rearward kick, dealing Physical Damage and Tripping the enemy.',
  },
  {
    icon: MountedDefenseIcon,
    name: 'Mounted Defense',
    cooldown: 60,
    description: 'Grants mount and rider immunity to Ranged Damage, Knockback, and Stun for #5sec#.',
  },
  {
    icon: BreakthroughIcon,
    name: 'Breakthrough',
    cooldown: 30,
    description: 'Charges forward for #3sec#, breaking through enemy lines. Inflicts Knockback and Trip on affected enemies.\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: MountedFireArrowIcon,
    name: 'Mounted Fire Arrow',
    range: [0, 30],
    cooldown: 12,
    effects: [BUFF.BURNING],
    description: 'Fires a burning arrow to deal +#500%# of Ranged Attack as Physical Damage; also deals +#200%# of Ranged Attack as damage over #5 seconds#.',
  },
  {
    icon: SnipeIcon,
    name: 'Snipe',
    range: [0, 35],
    cooldown: 24,
    description: 'Shoots an arrow a great distance and deals damage equal to #700%# of your Ranged Attack.',
    combos: [
      {
        buff: BUFF.BURNING,
        text: 'Inflicts additional +50% damage on ${b} targets.',
      },
    ],
  },
  {
    icon: ElegantLeapIcon,
    name: 'Elegant Leap',
    cooldown: 15,
    description: 'Triggers a long, elegant leap #25 m# forward.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: BiteIcon,
    name: 'Gnaw',
    range: [0, 5],
    cooldown: 18,
    description: 'Sharpens caster\'s bite, dealing Physical Damage and additional damage over #14sec#.',
  },
  {
    icon: BoarsBoreIcon,
    name: 'Boar\'s Bore',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a charge to a distant enemy, dealing Physical Damage, and inflicting Stun for #2sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: UnstoppableRaceIcon,
    name: 'Unstoppable Race',
    cooldown: 60,
    description: 'Charges forward for #3sec#.\r' +
      'Immediately cancels Snared and grants immunity to the effect during the charge.\r' +
      'Cannot be used while carrying a trade pack.',
  },
  {
    icon: WarCryIcon,
    name: 'War Cry',
    effectRange: 32,
    cooldown: 30,
    description: 'Grants offensive buffs to allies within 16m for 5 seconds. Effect ends early if you dismount.',
  }
]);
