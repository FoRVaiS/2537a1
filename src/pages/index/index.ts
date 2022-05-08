(async () => {
  const { fetchTotalPokemon, fetchPokemonByName } = window.pokedex as Required<NonNullable<typeof window.pokedex>>;

  const totalPokemon = await fetchTotalPokemon();
  const randomIds = Array.from(Array(9)).map(() => Math.round(Math.random() * totalPokemon - 1) + 1);
  const pokemon = await Promise.all(randomIds.map(id => fetchPokemonByName(id)));

  const galleryRef = document.querySelector('main > .gallery')!;

  for (let i = 0; i < 3; i++) {
    const section = document.createElement('div');
    section.classList.add('gallery__section');

    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;

      const [{ sprites }] = pokemon[index];

      const content = document.createElement('img');
      content.classList.add('gallery__content');
      content.src = sprites.other["official-artwork"].front_default;
      section.append(content);
    }

    galleryRef.append(section);
  }
})();
