import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { profile, projects, experiments, experimentCategories, skills, tools, books, roadmap } from '../src/content.js';
const root = fileURLToPath(new URL('../', import.meta.url));
const hasAsset = path => existsSync(`${root}public/${path}`);

test('15 unique, complete project concepts', () => {
  assert.equal(projects.length, 15);
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    for (const key of ['title', 'category', 'brief', 'goal', 'challenge', 'outcome']) assert.ok(project[key].length > 0, `${project.slug}: ${key}`);
    assert.equal(project.demo, true);
    assert.equal(project.images.length, 3);
    assert.equal(project.insights.length, 4);
    assert.equal(project.iterations.length, 5);
    for (const image of project.images) assert.ok(hasAsset(image), `Missing ${image}`);
  }
});
test('51 original experiments with valid filter categories', () => {
  assert.equal(experiments.length, 51);
  assert.equal(new Set(experiments.map(e => e.id)).size, 51);
  for (const experiment of experiments) assert.ok(experimentCategories.includes(experiment.category));
  for (const category of experimentCategories.slice(1)) assert.ok(experiments.some(e => e.category === category));
});
test('15 skills and eight tools', () => {
  assert.equal(skills.length, 15); assert.equal(tools.length, 8);
  for (const [name, score] of skills) { assert.ok(name); assert.ok(score >= 0 && score <= 100); }
});
test('self-hosted profile assets, fonts and CV exist', () => {
  for (const path of [profile.portrait, profile.profilePortrait, profile.cv, 'images/avatar.webp', 'images/skyline.webp', 'images/earth-dark.jpg', 'fonts/inter-latin.woff2', 'fonts/playfair-latin.woff2', 'fonts/playfair-italic-latin.woff2']) assert.ok(hasAsset(path), path);
  assert.equal(readFileSync(`${root}public/${profile.cv}`).subarray(0, 5).toString(), '%PDF-');
});
test('original book covers are present', () => {
  books.forEach((book, index) => assert.ok(hasAsset(`images/book-${index}.svg`), book.title));
});
test('roadmap includes all six stages', () => {
  assert.equal(roadmap.length, 6);
  assert.ok(roadmap.every(stage => stage.rows.length >= 2));
});
test('profile has safe editable defaults', () => {
  assert.match(profile.email, /@/); assert.ok(profile.hours > 0);
  assert.ok(profile.bio.join(' ').includes('fictional'));
});
