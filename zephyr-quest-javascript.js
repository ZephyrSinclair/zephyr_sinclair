const animationBox = document.getElementById("animation-box");
const frostbolt = document.getElementById("frostbolt");
const fireball = document.getElementById("fireball");

const castFrostbolt =
	document.getElementById("castFrostbolt") ||
	document.getElementById("cast-frostbolt");
const castFireball =
	document.getElementById("castFireball") ||
	document.getElementById("cast-fireball");

function buildSpellTiles(spellEl, prefix) {
	if (!spellEl || spellEl.children.length > 0) {
		return;
	}

	const files = "abcdefgh";
	for (const file of files) {
		for (let rank = 1; rank <= 8; rank += 1) {
			const tile = document.createElement("div");
			tile.className = "spell-tile";
			tile.id = `${prefix}${file}${rank}`;

			tile.style.gridColumn = String(files.indexOf(file) + 1);
			tile.style.gridRow = String(9 - rank);

			spellEl.appendChild(tile);
		}
	}
}

function wireSpellCast(buttonEl, spellEl, animationName) {
	if (!buttonEl || !spellEl || !animationBox) {
		return;
	}

	buttonEl.addEventListener("click", () => {
		if (spellEl.classList.contains("is-casting")) {
			return;
		}

		const travelX = Math.max(0, animationBox.clientWidth - spellEl.offsetWidth - 2);
		spellEl.style.setProperty("--travel-x", `${travelX}px`);

		// Restart animation from frame 0 on each cast.
		spellEl.classList.remove("is-casting");
		void spellEl.offsetWidth;
		spellEl.classList.add("is-casting");
	});

	spellEl.addEventListener(
		"animationend",
		(event) => {
			if (event.target !== spellEl || event.animationName !== animationName) {
				return;
			}
			spellEl.classList.remove("is-casting");
		},
		{ passive: true }
	);
}

buildSpellTiles(fireball, "fb-");
wireSpellCast(castFrostbolt, frostbolt, "frostbolt-cast");
wireSpellCast(castFireball, fireball, "fireball-cast");

