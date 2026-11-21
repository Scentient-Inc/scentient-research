import { freshEncounter, applyCorrection, exampleCorrection } from './greenhouse-core.js';

const candidates = [
  { name: 'Flowering stems', tags: ['flowers', 'stems'] },
  { name: 'Damp soil', tags: ['soil'] }
];
const element = id => document.getElementById(id);
let encounter;

function clearChoices() {
  element('memory').textContent = 'Awaiting choice';
  element('wear').textContent = 'Awaiting choice';
}

function reset() {
  encounter = freshEncounter();
  element('account').textContent = '“' + encounter.account + '”';
  clearChoices();
  element('correct').disabled = false;
  element('status').textContent = 'Choose scents to see the starting suggestions.';
}

element('choose').addEventListener('click', () => {
  const memoryChoice = candidates.find(candidate =>
    candidate.tags.every(tag => !encounter.exclusions.includes(tag))
  );
  const wearChoice = encounter.preferences.floralPerfumes === 'liked'
    ? candidates.find(candidate => candidate.tags.includes('flowers')) : undefined;
  element('memory').textContent = memoryChoice?.name ?? 'Ask for another option';
  element('wear').textContent = wearChoice?.name ?? 'Ask about wearing preferences';
  element('status').textContent = encounter.events.length
    ? 'The memory excludes flowers, so damp soil is next. The participant still likes florals for everyday wear.'
    : 'Both candidates are eligible for the memory. The example tries flowering stems first. The wearing choice uses the separate floral preference.';
});

element('correct').addEventListener('click', () => {
  encounter = applyCorrection(encounter, exampleCorrection);
  clearChoices();
  element('correct').disabled = true;
  element('status').textContent = 'Flowers excluded from this greenhouse memory. Choose scents again to see what follows.';
});
element('reset').addEventListener('click', reset);
reset();
