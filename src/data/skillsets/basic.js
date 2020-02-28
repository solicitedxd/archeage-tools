import { BUFF } from 'constants/skills';
import OwnersEscape from 'images/skill/auramancy/Teleportation.png';
import Beastsense from 'images/skill/shadowplay/Bloodthirst_Intensified.png';
import Snipe from 'images/skill/shadowplay/Ruthless_Assault.png';
import * as Icon from '../../images/skill/basic/';

export default Object.freeze([
  {
    id: 'Run',
    icon: Icon.Run,
    name: 'Run!',
    cooldown: 30,
    description: 'Increases Pet Move Speed #+50%# for #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    id: 'Run Glide',
    icon: Icon.Run,
    name: 'Run!',
    cooldown: 30,
    description: 'Increases Pet Move Speed #+50%# for #10sec#.\r' +
      'Increases Glide Speed +#30%#\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.MountedArrowshot,
    name: 'Mounted Arrowshot',
    range: [0, 30],
    description: 'Fires an arrow at an enemy, dealing Physical Damage equal to #80%# of the rider\'s ranged attack.',
  },
  {
    icon: Icon.Overrun,
    name: 'Overrun',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a charge that can Stun a distant enemy for #2sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Anabolica,
    name: 'Anabolica',
    cooldown: 60,
    description: 'Increases the pet\'s and rider\'s Attack +#30%# for #30sec#.\r' +
      'Canceled if you dismount.',
  },
  {
    icon: Icon.Dash,
    name: 'Dash',
    cooldown: 30,
    description: 'Triggers a forward charge for #3sec# that makes you invincible. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.MountedAttack,
    name: 'Mounted Attack',
    cooldown: 2,
    description: 'Deals #350%# of Melee Attack as Physical Damage with a chance of Tripping targets while mounted.',
  },
  {
    icon: Icon.DropBack,
    name: 'Drop Back',
    cooldown: 18,
    description: 'Triggers a #12 m# backwards leap to escape danger.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    id: 'Drop Back Gallant',
    icon: Icon.DropBack,
    name: 'Drop Back',
    cooldown: 20,
    description: 'A clever Leomorph can jump farther than other Leomorphs.\r' +
      'Triggers a #15 m# backwards leap to escape danger.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: OwnersEscape,
    name: 'Owner\'s Escape',
    cooldown: 30,
    description: 'Teleports the rider #18 meters# forward, out of the saddle.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: OwnersEscape,
    name: 'Enhanced Owner\'s Escape',
    cooldown: 30,
    description: 'Teleports the rider forward #18m# and increases rider\'s Move Speed.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.StealthMove,
    name: 'Stealth Move',
    cooldown: 180,
    description: 'Stealths both mount and rider for #30sec#.\r' +
      'Decreases Move Speed #-30%#.\r' +
      'Stealth ends if you attack or are attacked.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: Icon.StealthMove,
    name: 'Improved Stealth Move',
    cooldown: 90,
    description: 'Stealths both mount and rider for #30sec#.\r' +
      'Decreases Move Speed #-15%#.\r' +
      'Stealth ends if you attack or are attacked.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: Icon.Slam,
    name: 'Slam',
    cooldown: 18,
    description: 'Instructs the pangolin to wind up, then smash the ground to create an earthquake. Damages all enemies within 3m and decreases their Move Speed -30% for 3 seconds.',
  },
  {
    icon: Icon.Pangocharge,
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
    icon: Icon.StubbornDash,
    name: 'Stubborn Dash',
    cooldown: 60,
    description: 'Triggers a 3 second forward roll.\r' +
      'Increases the pangolin and rider\'s Defense and Magic Defense #+5000#, and grants immunity to Fear and Slow.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Patience,
    name: 'Patience',
    effectRange: 32,
    cooldown: 30,
    description: 'Grants defense buffs to allies within 16m for 5 seconds. Effect ends early if you dismount.',
  },
  {
    icon: Icon.BackKick,
    name: 'Back Kick',
    effectRange: 4,
    castTime: 0.3,
    cooldown: 18,
    effects: [BUFF.TRIPPED],
    description: 'Strengthens the mount\'s rearward kick, dealing Physical Damage and Tripping the enemy.',
  },
  {
    icon: Icon.MountedDefense,
    name: 'Mounted Defense',
    cooldown: 60,
    description: 'Grants mount and rider immunity to Ranged Damage, Knockback, and Stun for #5sec#.',
  },
  {
    icon: Icon.Breakthrough,
    name: 'Breakthrough',
    cooldown: 30,
    description: 'Charges forward for #3sec#, breaking through enemy lines. Inflicts Knockback and Trip on affected enemies.\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.MountedFireArrow,
    name: 'Mounted Fire Arrow',
    range: [0, 30],
    cooldown: 12,
    effects: [BUFF.BURNING],
    description: 'Fires a burning arrow to deal +#500%# of Ranged Attack as Physical Damage; also deals +#200%# of Ranged Attack as damage over #5 seconds#.',
  },
  {
    id: 'Mounted Fire Arrow Gallant',
    icon: Icon.MountedFireArrow,
    name: 'Mounted Fire Arrow',
    range: [0, 30],
    cooldown: 8,
    effects: [BUFF.BURNING],
    description: 'Fires a burning arrow to deal +#300%# of Ranged Attack as Physical Damage; also deals +#200%# of Ranged Attack as damage over #5 seconds#.',
  },
  {
    icon: Snipe,
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
    icon: Snipe,
    name: 'Precise Shot',
    range: [0, 35],
    cooldown: 24,
    description: 'Fires arrows that deal damage equal to #700%# Ranged Attack.\r' +
      'Places a Ranged Attack tag on the target.',
  },
  {
    icon: Icon.ElegantLeap,
    name: 'Elegant Leap',
    cooldown: 15,
    description: 'Triggers a long, elegant leap #25 m# forward.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Bite,
    name: 'Gnaw',
    range: [0, 5],
    cooldown: 18,
    description: 'Sharpens caster\'s bite, dealing Physical Damage and additional damage over #14sec#.',
  },
  {
    icon: Icon.Bite,
    name: 'Gnaw',
    id: 'GnawBleed',
    range: [0, 5],
    cooldown: 18,
    effects: [BUFF.BLEEDING],
    description: 'Sharpens caster\'s bite, dealing Physical Damage and additional damage over #14sec#.',
    combos: [
      {
        buff: BUFF.BLEEDING,
        causes: BUFF.BLEEDING,
        text: 'Increases severity of Bleed effects on targets.',
      },
    ],
  },
  {
    icon: Icon.Bite,
    name: 'Vicious Bite',
    range: [0, 5],
    cooldown: 18,
    effects: [BUFF.BLEEDING],
    description: 'Sharpens caster\'s bite, dealing Physical Damage and additional damage over #14sec#.',
  },
  {
    icon: Icon.BoarsBore,
    name: 'Boar\'s Bore',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a charge to a distant enemy, dealing Physical Damage, and inflicting Stun for #2sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.UnstoppableRace,
    name: 'Unstoppable Race',
    cooldown: 60,
    description: 'Charges forward for #3sec#.\r' +
      'Immediately cancels Snared and grants immunity to the effect during the charge.\r' +
      'Cannot be used while carrying a trade pack.',
  },
  {
    icon: Icon.WarCry,
    name: 'War Cry',
    effectRange: 32,
    cooldown: 30,
    description: 'Grants offensive buffs to allies within 16m for 5 seconds. Effect ends early if you dismount.',
  },
  {
    icon: Icon.HealthRegen,
    name: 'Health Regen',
    cooldown: 15,
    description: 'Healths pet\'s health.',
  },
  {
    icon: Icon.JoustingLanceCharge,
    name: 'Jousting Lance Charge',
    cooldown: 30,
    description: 'Triggers a charge with a Jousting Lance toward a target for #3sec#, dealing damage.\r' +
      'Removes Imprison and grants immunity to Fear while Charging.\r' +
      'Consumes one #Jousting Lance#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Run,
    name: 'Ghostly Steps',
    cooldown: 30,
    description: 'Increases Move Speed #+80%#, then gradually decreases it over #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Breakthrough,
    name: 'Hereafter Dash',
    cooldown: 60,
    description: 'Dashes into the otherworld for #3sec#, then reappears.\r' +
      'Slightly increases Move Speed. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.StealthMove,
    name: 'Nui\'s Veil',
    cooldown: 30,
    description: 'Stealths both mount and rider for #30sec#.\r' +
      'Stealth ends if you move, attack, or are attacked.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: Icon.Run,
    name: 'Keep Running!',
    cooldown: 30,
    description: 'Increases Pet Move Speed #+20%# for #15sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Run,
    name: 'Cloudstrike Dash',
    cooldown: 30,
    description: 'Increases Move Speed #+70%#, then gradually decreases it over #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.ElectricDash,
    name: 'Electric Dash',
    cooldown: 30,
    description: 'Darts forward #12 meters#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.StandStrong,
    name: 'Stand Strong',
    cooldown: 60,
    description: 'Grants Stun Immunity to a mount and rider for #5sec# and reduces received damage #-50%#.',
  },
  {
    icon: Icon.WindStrike,
    name: 'Wind Strike',
    cooldown: 24,
    description: 'Leaps into the sky and sends gusts of wind towards the land. Slows enemies in the target area and deals Magic Damage.',
  },
  {
    icon: Icon.Glide,
    name: 'Glide',
    cooldown: 60,
    description: 'Glide through the skies with your mount for #5min#. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Glide,
    name: 'Pega-Glide',
    cooldown: 60,
    description: 'Triggers your pegasus to glide through the sky for #5min#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Skydash,
    name: 'Skydash',
    cooldown: 60,
    description: 'Increases glide speed +#50%# for #5sec#. Can only be used while gliding.',
  },
  {
    icon: Icon.FleeingYata,
    name: 'Hippity Hop',
    cooldown: 2,
    description: 'Triggers a jump. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.DropBack,
    name: 'Hop Back',
    cooldown: 18,
    description: 'Triggers a #12 m# backwards leap to escape danger. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.CarrotCare,
    name: 'Carrot Care',
    cooldown: 60,
    channeled: true,
    description: 'Allows the rabbit to munch on a carrot for 10 seconds, restoring health and mana.\r' +
      'Movement cancels the skill.',
  },
  {
    icon: Icon.Run,
    name: 'Warmfuzzy Dash',
    cooldown: 30,
    description: 'Instructs the bear to pick up its master and run for #5sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.MountedDefense,
    name: 'I Am the Bear!',
    cooldown: 60,
    description: 'Absorbs mount\'s and rider\'s received Magic Damage and grants immunity to Trip, Snare, and Impale for #5sec#.',
  },
  {
    icon: Icon.Roll,
    name: 'Roll',
    cooldown: 30,
    description: 'Roll forward for #3sec#, pushing targets out of your path and decreasing their Move Speeds -10% for 3 seconds.\r' +
      'This skill counts as a Push effect.\r' +
      'You cannot use this skill while carrying trade packs.',
  },
  {
    icon: Icon.CarryAndRun,
    name: 'Carry and Run',
    cooldown: 60,
    description: 'Instructs the bear to pick up its master and run for #4sec#. Its master becomes invincible, but the bear receives 2x damage.\r' +
      'Can\'t be triggered if the master is wearing a trade pack.',
  },
  {
    icon: Icon.JoustingLanceCharge,
    name: 'Reckless Charge',
    range: [0, 15],
    cooldown: 24,
    description: 'Triggers a ferocious charge into a target. Deals damage and knocks the target back. Can inflict more damage with #Dash# active.\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Beastsense,
    name: 'Beastsense',
    cooldown: 60,
    description: 'Widens rider\'s Stealth detection range #+50%#.',
  },
  {
    id: 'Dash Gallant',
    icon: Icon.Dash,
    name: 'Dash',
    cooldown: 30,
    description: 'Triggers an invincible forward run for #3sec#.\r' +
      'Shares a cooldown with Leader of the Pack.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Anabolica,
    name: 'Leader of the Pack',
    effectRange: 15,
    cooldown: 30,
    description: 'Triggers a roar to gather all raid members\' mounts within 15m into a pack for 10 seconds.\r' +
      'Increases pack\'s Move Speed #+20%#.\r' +
      'Increases the pack leader\'s speed as more mounts join the pack.\r' +
      'Shares a cooldown with Dash.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Run,
    name: 'Thunder Dash',
    cooldown: 30,
    description: 'Increases Move Sped #+80%#, then gradually decreases it over #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Breakthrough,
    name: 'Ram',
    cooldown: 30,
    description: 'Charges forward, breaking through enemy lines for #3sec#. Rammed enemies receive damage and are knocked back.\r' +
      'This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.TerrifyingRoar,
    name: 'Terrifying Roar',
    channeled: true,
    cooldown: 60,
    description: 'Lets out a great roar, inflicting Fear on charging enemy mounts for 8 seconds.\r' +
      'Canceled by movement.',
  },
  {
    icon: Icon.FleeingYata,
    name: 'Fleeing Yata',
    cooldown: 2,
    description: 'Triggers a jump. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.ScanShips,
    name: 'Scan Ships',
    cooldown: 60,
    description: 'Displays all ships and drydocks within #100m# for #10sec#.',
  },
  {
    id: 'Scan Ships Aquestria',
    icon: Icon.ScanShips,
    name: 'Scan Ships',
    cooldown: 60,
    description: 'Aquestria creates sound waves to detect all ships and drydocks within 200m for 10 seconds.',
  },
  {
    icon: Icon.DolphinDash,
    name: 'Dolphin Dash',
    cooldown: 25,
    description: 'Triggers a forward dash with powerful tailfin strokes.\r' +
      'Increases Move Speed +#50%# for #10# seconds.\r' +
      'Can\'t be used while doing tricks.',
  },
  {
    icon: Icon.ProduceUltrasonicWaves,
    name: 'Produce ultrasonic waves',
    cooldown: 3,
    description: 'Send ultrasonic waves forward.',
  },
  {
    icon: Icon.Acrobatics,
    name: 'Acrobatics',
    cooldown: 10,
    description: 'Utilizes the fins to launch a powerful leap. May trigger different tricks depending on the dolphin\'s mood.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.AquestriaDash,
    name: 'Aquestria Dash',
    cooldown: 25,
    description: 'Increases Move Sped #+50#% for #10# seconds.\r' +
      'Can\'t be used while performing Sharp Dive or Acrobatics.',
  },
  {
    icon: Icon.SharpDive,
    name: 'Sharp Dive',
    cooldown: 30,
    description: 'A quick dive down into the depths.\r' +
      'Can\'t be used while Dashing, carrying a trade pack, or performing Acrobatics.',
  },
  {
    id: 'Acrobatics Aquestria',
    icon: Icon.AcrobaticsAquestria,
    name: 'Acrobatics',
    cooldown: 10,
    description: 'Allows Aquestria free rein to frolic as she wishes. May trigger different tricks depending on the creature\'s mood.\r' +
      'Can\'t be used while carrying a trade pack or performing Aquestria Dash or Dive.',
  },
  {
    icon: Icon.BubbleTrap,
    name: 'Bubble Trap',
    range: [0, 20],
    cooldown: 40,
    description: 'Traps an enemy inside a bubble for #4 sec# and slowly lifts it into the air. Bubble duration reduced -50% in PvP.\r' +
      'Enemies in bubbles can\'t attack, but will be freed upon taking damage.\r' +
      'Can\'t be used while performing Sharp Dive or Acrobatics.',
    combos: [
      {
        buff: BUFF.ELECTROCUTED,
        text: 'Deals additional Magic Damage to ${b} targets.',
      },
      {
        buff: BUFF.BURNING,
        text: '${b} targets are thrown higher.',
      },
    ],
  },
  {
    icon: Icon.DreamingDonkey,
    name: 'Dreaming Donkey',
    cooldown: 60,
    description: 'Increases donkey\'s Move Speed by #+50%# for #1min#.\r' +
      'Can only be used while wearing a trade pack and consumes #1 Carrot#.\r' +
      'Combat cancels the effect.',
  },
  {
    icon: Icon.Breakthrough,
    name: 'La Mancha\'s Call',
    cooldown: 60,
    description: 'Raise your spear high and charge forward for #7sec#.\r' +
      'You cannot turn left or right once the charge begins.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    id: 'Nui\'s Veil Donkey',
    icon: Icon.NuiSVeil,
    name: 'Nui\'s Veil',
    cooldown: 90,
    description: 'Grants Stealth to both mount and rider for #45sec#.\r' +
      'Stealth ends if you attack or are attacked.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: Icon.ElegantLeap,
    name: 'Powerful Wingbeats',
    cooldown: 10,
    description: 'Encourage Carrot Wings to fly.',
  },
  {
    icon: Icon.QuickMovement,
    name: 'Quick Movement',
    cooldown: 30,
    description: 'Increases rider\'s Evasion +#50%# and grants immunity to Stun for #10sec#.',
  },
  {
    icon: Icon.RunOwlina,
    id: 'Run Owlina',
    name: 'Run!',
    cooldown: 30,
    description: 'Increases the pet\'s Move Speed #+50%# for #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.RippingClaws,
    name: 'Ripping Claws',
    cooldown: 2,
    description: 'Attacks the enemies in front of them with its strong claws.',
  },
  {
    icon: Icon.ProtectiveRoll,
    name: 'Protective Roll',
    cooldown: 60,
    description: 'Owlina rolls forward and absorbs #2,000# Damage for 3 seconds, for the owner and itself.\r' +
      'For the same duration, both are immune to #Fear#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Floofy,
    name: 'Floofy',
    cooldown: 30,
    effectRange: 32,
    description: 'Owlina increases its body temperature for #5 minutes#, granting immunity to the Millennium Blizzard for itself and the owner within 18m.\r' +
      'When three or more Owlinas have the Floofy buff active, their Move Speed is increased.',
  },
  {
    icon: Icon.WildGaze,
    name: 'Wild Gaze',
    cooldown: 40,
    effectRange: 15,
    description: 'Inflicts #Fear# on up to 5 hostile pets that are facing the Owlina within a #15m# radius, for 3 seconds.',
  },
  {
    icon: Icon.Run,
    name: 'A Dashardly Plan',
    cooldown: 30,
    description: 'Increases mount\'s Move Speed #+50%# for #10sec#.\r' +
      'Increases gliding speed #+30%# while airborne.',
  },
  {
    icon: Icon.Bite,
    name: 'Overwhelm',
    cooldown: 18,
    range: [0, 18],
    effects: [
      BUFF.BLEEDING,
    ],
    description: 'Charges a distant enemy, then bites it to deal Physical Damage. Decreases enemy\'s Move Speed #-30%# for 3 seconds and inflicts damage over time.\r' +
      'Can\'t be used during Conductive Charge or Fly.',
  },
  {
    icon: Icon.LightningGlide,
    name: 'Lightning Glide',
    cooldown: 60,
    description: 'Powers the mount into the air for #5min#. Can\'t be used during Conductive Charge or Thunderbreath.',
  },
  {
    icon: Icon.ConductiveCharge,
    name: 'Conductive Charge',
    cooldown: 60,
    description: 'Triggers a forward charge for #3sec#. Deals damage to rammed enemies, tripping them and knocking them back.\r' +
      'This skill counts as a Push effect.\r' +
      'Grants immunity and lets the drake dart forward if used during Fly.',
  },
  {
    icon: Icon.Thunderbreath,
    name: 'Thunderbreath',
    cooldown: 60,
    description: 'Allows the drake to spew electricity, dealing Magic Damage and inflicting Shock on a target within 15m.\r' +
      'Can\'t be used during Conductive Charge or Fly.',
  },
  {
    id: 'Glide Dragon',
    icon: Icon.LightningGlide,
    name: 'Glide',
    cooldown: 60,
    description: 'Glide through the skies with your mount for #5min#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.ChillingFootsteps,
    name: 'Chilling Footsteps',
    cooldown: 45,
    description: 'For #3 seconds#, the Dragon leaves frozen footsteps along its path which lasts for #3 seconds#, inflicting Slow for #3 seconds# on enemies that walk on it.\r' +
      'Can\'t be used while gliding.\r' +
      'Can\'t use while carrying a trade pack.',
  },
  {
    icon: Icon.IceShield,
    name: 'Ice Shield',
    cooldown: 60,
    description: 'Creates an ice shield that is immune to all damage for the owner and the Dragon for #3 sec#.\r' +
      'You are unable to move or attack while using the skill.\r' +
      'The ice shield is cancelled if the owner dismounts.\r' +
      'Can\'t use while carrying a trade pack.\r' +
      'Can\'t be used while airborne.',
  },
  {
    icon: Icon.FrostBreath,
    name: 'Frost Breath',
    cooldown: 60,
    description: 'Unleashes an arc of freezing breath reaching up to 15m, Freezing affected enemies for 5 seconds.\r' +
      'Duration of Freeze is decreased -50% in PvP.\r' +
      'While airborn, the Dragon breathes in a straight line, Freezing affected enemies for 2.5 seconds.\r\r' +
      'Can\'t use while carrying a trade pack.',
  },
  {
    icon: Icon.PumpkinCandyPower,
    name: 'Pumpkin Candy Power',
    cooldown: 5,
    description: 'Triggers an instant dash forward.',
  },
  {
    icon: Icon.BuckUpFriends,
    name: 'Buck Up, Friends',
    cooldown: 10,
    description: 'Propels all ally snails within 5m forward.',
  },
  {
    icon: OwnersEscape,
    name: 'Launch Owner',
    cooldown: 20,
    description: 'Launches the rider forward. Can\'t be used if the rider is carrying a trade pack.',
  },
  {
    icon: Icon.Bite,
    id: 'Gnaw Predator',
    name: 'Gnaw',
    range: [0, 5],
    cooldown: 18,
    effects: [
      BUFF.BLEEDING,
    ],
    description: 'Sharpens mount\'s bite, dealing Physical Damage and additional damage. Triggers *Vicious Bite* if *Invisible Predator* is active.\r' +
      '*Vicious Bite* deals Physical Damage and reduces a target\'s Move Speed.',
  },
  {
    icon: Icon.Run,
    name: '4-Leg Lope',
    cooldown: 30,
    description: 'Increases Move Speed +50% for its duration. Triggers *Careen* if *Invisible Predator* is active.\r' +
      '*Careen* drastically increases Move Speed, which then decreases gradually.\r' +
      'Can\'t be used while carrying a trade packs.',
  },
  {
    icon: Icon.Overrun,
    id: 'Overrun Predator',
    name: 'Overwhelm',
    range: [0, 15],
    cooldown: 24,
    description: 'Charges into a distant target and inflicts Stun for its duration. Triggers *Ambush* if *Invisible Predator* is active.\r' +
      '*Ambush* damages the charged enemy.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Dash,
    id: 'Dash Predator',
    name: 'Dash',
    cooldown: 60,
    description: 'Lets the mount dash invincibly forward. Triggers *Rip-Roaring* if *Invisible Predator* is active.\r' +
      '*Rip-Roaring* triggers a fast run and grants invincibility. Damages and pushes nearby enemies.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.InvisiblePredator,
    name: 'Invisible Predator',
    cooldown: 60,
    description: 'Stealths the mount and rider for #5sec#.\r' +
      'Enhances certain other skills while active.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.StealthMove,
    name: 'Lightning Stealth',
    cooldown: 180,
    description: 'Stealths both mount and rider for #1min#.\r' +
      'Stealth ends if you attack or are attacked.\r' +
      'During stealth and for some time afterwards, the following skills are temporarily disabled:\r' +
      'Overwhelm, Steady Shooting, Charge, Drop Back, Tiger Strike, Behind Enemy Lines, Blink, Bladeblast or Twin Shadow Slash.\r' +
      'Can\'t be used in combat.',
  },
  {
    icon: Icon.Run,
    name: 'Power Dash',
    cooldown: 30,
    description: 'Increases Move Speed #+70%# for #10sec# then gradually decreases.\r' +
      'Can\'t be used while carrying a tradepack.',
  },
  {
    icon: Icon.StrongClaws,
    name: 'Scratch',
    cooldown: 18,
    range: [0, 5],
    effects: [
      BUFF.BLEEDING,
    ],
    description: 'Rakes your enemy with sharp claws, dealing Physical Damage and an additional damage of #14sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.BewitchingTails,
    name: 'Bewitching Tails',
    range: [0, 20],
    cooldown: 30,
    description: 'Inflicts Fear for 1 second, causing the enemy to run in random directions and preventing all other actions except Evade, Block, and Parry. Inflicts Charm for 9 seconds after the fear expires, making the target more susceptible to Songcraft skill effects.',
  },
  {
    icon: Icon.Dash,
    id: 'Dash 1m',
    name: 'Dash',
    cooldown: 60,
    description: 'Triggers a forward charge for #3sec# that makes you invincible and increases Move Speed +#50%#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Dash,
    name: 'Protective Dash',
    cooldown: 60,
    description: 'Triggers a forward charge for #3sec# that makes you invincible. Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Run,
    name: 'Iron Dash',
    cooldown: 30,
    description: 'Increases Move Speed #+80%#, then gradually decreases it over #10sec#.\r' +
      'Can\'t be used during Rampage or while carrying a trade pack.',
  },
  {
    icon: Icon.RocketLunge,
    name: 'Rocket Lunge',
    cooldown: 18,
    range: [0, 15],
    description: 'Launches the Taurus towards a target, dealing physical damage and stunning the target for #2sec#.\r' +
      'Can\'t be used during Juggernaut Charge, Rampage, or while carrying a trade pack.',
  },
  {
    icon: Icon.KineticShield,
    name: 'Kinetic Shield',
    cooldown: 60,
    description: 'Decreases the mount and rider\'s received damage #-50%# for #6sec#, and grants one stack of #Overcharged#. Overcharge stacks up to three times, and disappears if the Siegeram Taurus is desummoned.\r' +
      'Can\'t be used during Juggernaut Charge, Rampage, or while carrying a trade pack.',
  },
  {
    icon: Icon.JuggernautCharge,
    name: 'Juggernaut Charge',
    cooldown: 60,
    description: 'Charges forward for #3sec#, knocking enemies aside and dealing damage.\r' +
      'This counts as a Push effect.\r' +
      'Can\'t be used during Rampage or while carrying a trade pack.',
  },
  {
    icon: Icon.Rampage,
    name: 'Rampage',
    cooldown: 60,
    description: 'Grants invincibility for #3 seconds#, charging in random directions to deal Damage, knockback, and stun nearby enemies. Each stack of Overcharge increases Rampage duration +1 second. Stun lats #2 seconds@.\r' +
      'This skill counts as a Push effect.\r\r' +
      'Can\'t be used during Iron Dash, Juggernaut Charge, or while carrying a trade pack. Can\'t use other mount skills until Rampage ends.',
  },
  {
    icon: Icon.RunKirin,
    id: 'Run Kirin',
    name: 'Run',
    cooldown: 30,
    description: 'Increases Move Speed #+80%#, then gradually decreases it over #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Bite,
    name: 'Shred',
    range: [0, 5],
    cooldown: 18,
    effects: [BUFF.BLEEDING],
    description: 'Sharpens caster\'s bite, dealing Physical Damage and additional damage over #14sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Overrun,
    id: 'Overrun Kirin',
    name: 'Overwhelm',
    range: [0, 15],
    cooldown: 24,
    description: 'Pounce at and stun a faraway target.\r' +
      'Can\'t use while carrying a trade pack.',
  },
  {
    icon: Beastsense,
    name: 'Guardian\'s Eyes',
    cooldown: 60,
    description: 'Increases Stealth Detection #+200%#.',
  },
  {
    icon: Icon.EvasiveLeap,
    name: 'Evasive Leap',
    cooldown: 35,
    description: 'Stealtsh mount and rider and leaps forward #25m#.\r' +
      'Increases mount\'s Move Speed #+50%# for 3 seconds.\r' +
      'Leaps #35m# if this skill is used while Run! is active.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.BoulderToss,
    name: 'Boulder Toss',
    cooldown: 6,
    range: [0, 20],
    description: 'Throw a huge rock toward an enemy in a long distance to inflict Ranged Damage.',
  },
  {
    icon: Icon.RunVineGiant,
    id: 'Run Vine Giant',
    name: 'Run!',
    cooldown: 30,
    description: 'Increases Pet Move Speed #+50%# for #10sec#.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.StranglingVines,
    name: 'Strangling Vines',
    cooldown: 45,
    description: 'Shoots vines 20m forward to drag up to three enemies towards the Vine Giant. Pulled enemies are Staggered, briefly stopping movement and canceling all Cast Time and Channeled skills.\r' +
      'Does not affect enemies under the Vine Obstruction debuff.',
  },
  {
    icon: Icon.WildCharge,
    name: 'Wild Charge',
    cooldown: 60,
    description: 'Charges forward foe #3sec#, breaking through enemy lines. Inflicts Knockback and Trip on affected enemies.\r' +
      'This counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.ForceOfNature,
    name: 'Force of Nature',
    range: [0, 15],
    effectRange: 5,
    cooldown: 60,
    description: 'Leaps to the target location, creating shockwaves on impact that bounce enemies in a 5m area.\r' +
      'This effect is not applied on enemies under the Force of Nature debuff.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.RunDrakora,
    id: 'Run Drakora',
    name: 'Run!',
    cooldown: 30,
    description: 'Increases mount\'s Move Speed #+50%# for #15sec#.\r' +
      'Increases Glide Speed #+30%# while airborne for #15sec#.',
  },
  {
    icon: Icon.GlideDrakora,
    id: 'Glide Drakora',
    name: 'Glide',
    cooldown: 60,
    description: 'Glide through the skies with your mount for #5min#\r' +
      'Can\'t use while carrying a trade pack.',
  },
  {
    icon: Icon.BreakthroughDrakora,
    id: 'Breakthrough Drakora',
    name: 'Breakthrough',
    cooldown: 30,
    description: 'Charges forward for #3sec#, breaking through enemy lines. Inflicts Knockback and Trip on affected enemies. This skill counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Bite,
    id: 'Vicious Bite Wyvern',
    name: 'Vicious Bite',
    range: [0, 15],
    cooldown: 18,
    effects: [BUFF.BLEEDING],
    description: 'Strikes a distant target, dealing Physical Damage and additional damage over #14sec#.\r' +
      'Can\'t be used while charging, airborne, or carrying a trade pack.',
  },
  {
    icon: Icon.Run,
    id: 'Run Wyvern',
    name: 'Run!',
    cooldown: 30,
    description: 'Increases pet\'s Move Speed #+50%# for #10sec#.\r' +
      'Increases Glide speed #+50%# while gliding.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.ToTheAir,
    name: 'To the Air',
    cooldown: 10,
    description: 'Encourages the small wyvern to fly for #5min#.\r' +
      'Can\'t be used while charging or carrying a trade pack.',
  },
  {
    icon: Icon.RamWyvern,
    id: 'Ram Wyvern',
    name: 'Ram',
    cooldown: 60,
    description: 'Charges forward, breaking through enemy lines for #3sec#. Rammed enemies receive damage and are knocked back.\r' +
      'This counts as a Push effect.\r' +
      'Can\'t be used while carrying a trade pack.',
  },
  {
    icon: Icon.Flamebreath,
    name: 'Flamebreath',
    range: [0, 20],
    cooldown: 180,
    description: 'Lets the wyvern unleash a burst of flame, incinerating enemies.\r' +
      'Can be used from the ground.\r' +
      'Inflicts Siege Damage on enemies and deals additional Magic Damage.\r' +
      'Can\'t be used while charging or airborne.',
  },
  {
    id: 'Run Manticore',
    icon: Icon.RunManticore,
    name: 'Run!',
    cooldown: 30,
    description: 'Increases pet\'s Move Speed #+50%# for #10 sec#.\r' +
      'Increases gliding speed #+30%# while airborne.',
  },
  {
    id: 'Overrun Manticore',
    icon: Icon.Bite,
    name: 'Overrun',
    range: [0, 15],
    cooldown: 18,
    effects: [BUFF.BLEEDING],
    description: 'Triggers a forward charge to bite an enemy, dealing Physical Damage.\r' +
      'Decreases enemy\'s Move Speed #-30%# for 3 seconds and inflicts damage over #10 sec#.\r' +
      'Can\'t be used while under the effects of Roar of the Pride.',
  },
  {
    id: 'Glide Manticore',
    icon: Icon.GlideManticore,
    name: 'Glide',
    cooldown: 60,
    description: 'Glide through the skies with your mount for #5 min#.\r' +
      'Can\'t be used while under the effects of Roar of the Pride.',
  },
  {
    icon: Icon.WingBoost,
    name: 'Wing Boost',
    cooldown: 25,
    description: 'Leap #30m# forward.\r' +
      'Grants Invincibility for #3 seconds# if used while airborne.\r' +
      'Can\'t be used while under the effects of Roar of the Pride.',
  },
  {
    icon: Icon.RoarOfThePride,
    name: 'Roar of the Pride',
    effectRange: 16,
    cooldown: 60,
    description: 'Decreases received damage #-7%# for all raid members and their mounts within #15m#.\r' +
      'Lasts #7# seconds.\r' +
      'Can\'t be used while airborne.',
  },
]);
