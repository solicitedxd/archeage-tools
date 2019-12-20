import {
  ATTACK,
  BUFF,
  ELEMENT,
  GLOBAL_CD,
  SKILLMOD,
} from 'constants/skills';
import { getSkillIdByName } from 'utils/skillsets';
import * as Icon from '../../images/skill/auramancy/';

const skills = Object.freeze([
  {
    icon: Icon.Thwart,
    name: 'Thwart',
    rank: 6,
    mana: 88,
    effectRange: 6,
    cooldown: 15,
    effects: [BUFF.WARDING_LIGHT, BUFF.SHAKEN],
    stacks: 1,
    description: 'Grants the caster ${stacks} stack of #Warding Light# for #20sec.#\r\r' +
      '#Warding Light:#\r' +
      '- Absorbs up to #5000# damage from the next instance of received damage.\r' +
      '- Reduces active Cooldowns for #Comet\'s Boon, Vicious Implosion,# and #Shrug It Off# by #-4 sec# when cast.\r' +
      '- This effect can stack up to #3# times.\r\r' +
      'Also inflicts #Shaken# for #3sec# on all enemies within #${effectRange}m,# reducing their combat effectiveness:\r' +
      'Decreases Move Speed -#45%#\r' +
      'Decreases Skill Damage -#20%#\r' +
      'Decreases Attack Speed -#250#.',
    globalCooldown: GLOBAL_CD.REDUCED,
    incapacitated: true,
  },
  {
    icon: Icon.CometsBoon,
    name: 'Comet\'s Boon',
    rank: 11,
    mana: 327,
    effectRange: 31,
    damage: { base: 1197, attack: ATTACK.MAGIC, ratio: 100 },
    cooldown: 12,
    description: 'Fires a flash of light that deals ${damage} Magic Damage to all enemies in a straight line, leaving a scorched path on the ground.\r' +
      'Increases the Move Speed of the caster and any allies that walk on the path.',
  },
  {
    icon: Icon.ConversionShield,
    name: 'Conversion Shield',
    rank: 5,
    mana: 69,
    cooldown: 20,
    description: 'Converts #25%# of Received Magic Damage to Health.\r' +
      'Lasts #5sec#.',
    descriptionNote: '\rThis skill does not trigger a Global Cooldown.',
    incapacitated: true,
    combos: [
      {
        buff: BUFF.COURAGEOUS_ACTION,
        causes: BUFF.MAGIC_SHIELD,
        text: 'Grants ${c} for &nbsp;if cast while under the effects of ${b}.',
      },
    ],
  },
  {
    icon: Icon.ViciousImplosion,
    name: 'Vicious Implosion',
    rank: 9,
    mana: 497,
    effectRange: 10,
    damage: { base: 1814, attack: ATTACK.MAGIC, ratio: 150 },
    cooldown: 15,
    description: 'Triggers a sudden, powerful implosion, pulling enemies with #${effectRange} meters# towards you and dealing ${damage} Magic Damage.\r' +
      'Interrupts affected enemies\' Cast Time and Channeled skills, and decreases their Received Healing #-60%# for #4 sec.#\r' +
      'Grants affected enemies temporary #Vicious Implosion Immunity# when the pull effect ends.',
    combos: [
      {
        buff: BUFF.PROVOKE,
        text: 'Increases Aggro +300% when used on Taunted targets.',
      },
    ],
  },
  {
    icon: Icon.Teleportation,
    name: 'Teleportation',
    mana: 29,
    cooldown: 35,
    description: 'Magically teleports the caster forward #15m.#',
    descriptionNote: '\rThis skill can be used during Global Cooldowns, and does not trigger a Global Cooldown.',
    movement: true,
  },
  {
    icon: Icon.CourageousAction,
    name: 'Courageous Action',
    mana: 55,
    range: [0, 20],
    cooldown: 30,
    description: 'Immune to Fear, Sleep, Bubble Trap, Freeze, Silence, Petrification, Taunt, and Telekinesis, for #5sec#. Can be used on the caster or an ally.',
    globalCooldown: GLOBAL_CD.REDUCED,
  },
  {
    icon: Icon.Meditate,
    name: 'Meditate',
    channeled: true,
    cooldown: 45,
    description: 'Restores #+3%# of max mana per second for #5sec# through meditation. Decreases Auramancy Skill Cooldowns #-15%# when the channeling ends.\r' +
      'This skill ends early if the caster moves or stops channel.',
  },
  {
    icon: Icon.ShrugItOff,
    name: 'Shrug It Off',
    mana: 78,
    cooldown: 120,
    effects: [BUFF.SHRUG_IT_OFF],
    description: 'Cancels all Confinement effects including Fear, Sleep, Bubble Trap, Freeze, Silence, Petrification, Telekinesis, and Taunt.',
    globalCooldown: GLOBAL_CD.NONE,
  },
  {
    icon: Icon.HealthLift,
    name: 'Health Lift',
    rank: 4,
    mana: 110,
    effectRange: 30,
    cooldown: 90,
    description: 'Grants the caster and all raid nearby members bonus hitpoints for #20sec#.\r' +
      'Increases Max Health +#4172#.',
  },
  {
    icon: Icon.Banishment,
    name: 'Banishment',
    mana: 85,
    range: [0, 15],
    effectRange: 6,
    cooldown: 40,
    description: 'Inflicts Banishment on all enemies in the target area for #5sec#. Increases Skill Mana Costs #+100%#\r\r' +
      'Using the skill on mounts deals Magic Damage equal to #200%# of the mount\'s Health.\r' +
      'Cannot be used on Dragons or Wyverns.',
    combos: [
      {
        buff: BUFF.SLOWED,
        causes: BUFF.POTIONS_DISABLED,
        text: 'Disables ${b} target\'s Potion uses for #5sec#',
      },
      {
        buff: BUFF.SNARED,
        causes: BUFF.FLIGHT_DISABLED,
        text: '${b} targets can\'t use Gliders or Magithopters for #5sec#',
      },
    ],
  },
  {
    icon: Icon.ProtectiveWings,
    name: 'Protective Wings',
    mana: 238,
    effectRange: 5,
    channeled: true,
    cooldown: 2,
    description: 'Grants #+50%# Magic Damage Reduction to the caster and up to #20 allies# within 5m for #12sec#.\r' +
      'Caster and all affected allies are immune to Silence.\r' +
      'This skill ends early if the caster moves or stops channeling.',
  },
  {
    icon: Icon.BracingBlast,
    name: 'Bracing Blast',
    mana: 142,
    effectRange: 10,
    cooldown: 45,
    description: 'Pushes up to #8 enemies# within a ${effectRange}m radius directly away from the caster, and grants the caster +10% Magic Damage Reduction per affected enemy (max 30%) for #20sec#.\r' +
      'Interrupts affected enemies\' Cast Time and Channeled skills, and Silences them for 3 seconds.',
  },
]);

export const passives = Object.freeze([
  {
    icon: Icon.AbsorbDamage,
    name: 'Absorb Damage',
    description: 'Converts #13%# of Received Damage to Health for #9 seconds#.\r\r' +
      'This ability has a #20 sec# Cooldown once triggered.',
  },
  {
    icon: Icon.InnerPeace,
    name: 'Inner Peace',
    description: 'Decreases Fear and Sleep Effect Durations #-20%.#',
  },
  {
    icon: Icon.Unassailable,
    name: 'Unassailable',
    description: 'Grants a #1%# chance to gain invincibility for #2 sec# after receiving any damage.\r\r' +
      'This ability has a #20 sec# Cooldown once triggered.',
  },
  {
    icon: Icon.WardMastery,
    name: 'Ward Mastery',
    description: '#Warding Light# stacks twice.',
    skillMod: [
      {
        type: SKILLMOD.SET,
        vars: { stacks: 2 },
        skills: [0],
      },
    ],
  },
  {
    icon: Icon.AcceleratedCasting,
    name: 'Accelerated Casting',
    description: 'Each time you cast #Thwart,# active Auramancy Cooldowns are decreased by #-10%.#',
  },
  {
    icon: Icon.UnwaveringWill,
    name: 'Unwavering Will',
    description: 'Grants #+30%# Magic Damage Reduction for #3 sec# each time you receive a Magic Critical Strike.\r' +
      'Increases Accuracy #+5%#.\r' +
      'This ability has a #20 sec# Cooldown once triggered.',
  },
]);

export const ancestrals = Object.freeze([
  {
    skillId: getSkillIdByName(skills, 'Thwart'),
    variants: [
      {
        element: ELEMENT.MIST,
        icon: Icon.ThwartMist,
        effects: [BUFF.WARDING_LIGHT],
        description: 'Grants #Warding Mist# to the caster and all allies within #6m.#\r\r' +
          '#Warding Mist:#\r' +
          '- Absorbs up to #3000# damage from the next instance of received damage.\r' +
          '- Lasts #20sec.#\r' +
          '- Reduces active Cooldowns for #Comet\'s Boon, Vicious Implosion,# and #Shrug It Off# by #-4 sec# when cast.\r' +
          '- This effect does not stack.',
      },
      {
        element: ELEMENT.STONE,
        icon: Icon.ThwartStone,
        effects: [BUFF.WARDING_LIGHT],
        description: 'Grants the caster ${stacks} stack of #Warding Light# for #20sec.#\r\r' +
          '#Warding Light:#\r' +
          '- Absorbs up to #5000# damage from the next instance of received damage.\r' +
          '- Reduces active Cooldowns for #Comet\'s Boon, Vicious Implosion,# and #Shrug It Off# by #-4 sec# when cast.\r' +
          '- This effect can stack up to #3# times.\r\r' +
          'Also inflicts #Shattering Curse# for #3sec# on all enemies within #${effectRange}m,# causing them to take #+20# Damage from all attacks.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Conversion Shield'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.ConversionShieldFlame,
        effects: [BUFF.CONVERSION_SHIELD_FLAME],
        description: 'Reflects #25%# of incoming Magic Damage, and converts it into Health.\r' +
          'The caster receives #75%# of Magic Damage.\r' +
          'Last #3sec#.',
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.ConversionShieldMist,
        range: [0, 20],
        cooldown: 40,
        effects: [BUFF.CONVERSION_SHIELD],
        description: 'Converts #25%# of Received Magic Damage to health.\r' +
          'Last #5sec#.\r' +
          'Can be cast on yourself or an ally.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Protective Wings'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.ProtectiveWingsFlame,
        effectRange: 15,
        description: 'Prevents #20%# of received Magic Damage from affecting the caster and allies within #${effectRange}m# for up to #12 sec.# Affects up to #20 allies# at a time.\r' +
          'Affected allies also reflect #20%# of received Magic Damage to attackers for the duration, but the caster takes #80%# of received Damage.\r' +
          'The caster and affected allies are immune to Silence.',
        descriptionNote: 'This skill ends early if the caster moves or stops channeling.',
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.ProtectiveWingsMist,
        range: [0, 20],
        description: 'Grants #+50%# Magic Damage Reduction to the caster and up to #20 allies# within 5m for #12sec#.\r' +
          'Caster and all affected allies are immune to Silence.',
        descriptionNote: 'This skill ends early if the caster moves or stops channeling.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Teleportation'),
    variants: [
      {
        element: ELEMENT.LIGHTNING,
        icon: Icon.TeleportationLightning,
        description: 'Teleports the caster #10m# forward and has a #42%# chance to trigger an additional teleport.',
      },
      {
        element: ELEMENT.MIST,
        icon: Icon.TeleportationMist,
        range: [0, 12],
        description: 'Teleports the caster to a location within a #${range[1]}m# radius.',
      },
    ],
  },
  {
    skillId: getSkillIdByName(skills, 'Vicious Implosion'),
    variants: [
      {
        element: ELEMENT.FLAME,
        icon: Icon.ViciousImplosionFlame,
        effects: [BUFF.PROVOKE],
        description: 'Triggers a sudden, powerful implosion, pulling enemies within #${effectRange} meters# towards you and dealing ${damage} Magic Damage.\r' +
          'Interrupts affected enemies\' Cast Time and Channeled skills, and inflicts #${effects[0]}# to affected enemies for #3sec#.\r\r' +
          'Grants affected enemies temporary #Vicious Implosion Immunity# when the pull effect ends.',
      },
      {
        element: ELEMENT.STONE,
        icon: Icon.ViciousImplosionStone,
        effectRange: 7,
        combos: [
          {
            buff: BUFF.PROVOKE,
            text: 'Decreases the Magic Skill Damage of taunted targets #-15%# for #10 sec#.',
          },
        ],
      },
    ],
  },
]);

export default skills;
