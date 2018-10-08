import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/cta.scss';

class CTA extends Component {
  state = {
    quoteText: 'Ability decrease antimagic balance domain base save bonus caster level check class skill ' +
      'cowering effective hit point increase eladrin subtype energy drained fear aura fear cone fear effect ' +
      'fraction frightful presence improved evasion level massive damage melee attack mentalism domain ' +
      'racial hit die retribution domain spell threat range touch spell turn undead. Character coup de ' +
      'grace destruction domain fate domain goblinoid subtype lava effects monk mundane native subtype ' +
      'paralysis pattern subschool regeneration. Animal type aquatic subtype change shape competence ' +
      'bonus dispel dispel turning drow domain gnome domain initiative count luck bonus overlap renewal ' +
      'domain scry spell descriptor spell resistance surprise total concealment unarmed attack.'
  };

  fetchText = () => {
    axios.get('https://api.icndb.com/jokes/random')
      .then(response => this.setState({ quoteText: response.data.value.joke }))
      .catch((err) => this.setState({ quoteText: `Oops! An error occurred. Please try again. ${err}` }));
  }

  render() {
    return (
      <section className='cta-section'>
      	<div className='cta-div'>
      		<p>{ this.state.quoteText }</p>
      		<a onClick={ this.fetchText }>Tell me more</a>
      	</div>
      </section>
    );
  }
}

export default CTA;
