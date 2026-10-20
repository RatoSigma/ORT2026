import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_PERFIL = '@resenha:perfil';
const CHAVE_WISHLIST = '@resenha:wishlist';
const CHAVE_TEMA_INICIAL_MIGRADO = '@resenha:escuro';

export const PERFIL_PADRAO = {
  nickname: 'Salustiano',
  darkMode: true,
};

export async function obterPerfil() {
  const perfilJson = await AsyncStorage.getItem(CHAVE_PERFIL);

  if (!perfilJson) {
    return PERFIL_PADRAO;
  }

  const perfilSalvo = JSON.parse(perfilJson);

  if (!perfilSalvo || typeof perfilSalvo !== 'object' || Array.isArray(perfilSalvo)) {
    throw new Error('Os dados do perfil salvos no dispositivo são inválidos.');
  }

  return {
    nickname:
      perfilSalvo.nickname === 'Salustiano'
        ? PERFIL_PADRAO.nickname
        : typeof perfilSalvo.nickname === 'string'
        ? perfilSalvo.nickname
        : PERFIL_PADRAO.nickname,
    darkMode:
      typeof perfilSalvo.darkMode === 'boolean'
        ? perfilSalvo.darkMode
        : PERFIL_PADRAO.darkMode,
  };
}

export async function salvarPerfil(perfil) {
  await AsyncStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
}

export async function obterWishlistIds() {
  const wishlistJson = await AsyncStorage.getItem(CHAVE_WISHLIST);

  if (!wishlistJson) {
    return [];
  }

  const wishlistSalva = JSON.parse(wishlistJson);

  if (!Array.isArray(wishlistSalva) || !wishlistSalva.every((id) => typeof id === 'string')) {
    throw new Error('Os dados da wishlist salvos no dispositivo são inválidos.');
  }

  return wishlistSalva;
}

export async function salvarWishlistIds(listaIds) {
  await AsyncStorage.setItem(CHAVE_WISHLIST, JSON.stringify(listaIds));
}

export async function obterDadosIniciais() {
  const temaInicialMigrado = await AsyncStorage.getItem(CHAVE_TEMA_INICIAL_MIGRADO);
  const [perfilSalvo, wishlistIds] = await Promise.all([obterPerfil(), obterWishlistIds()]);

  let perfil = perfilSalvo;

  if (!temaInicialMigrado) {
    perfil = { ...perfilSalvo, darkMode: true };
    await salvarPerfil(perfil);
    await AsyncStorage.setItem(CHAVE_TEMA_INICIAL_MIGRADO, 'true');
  }

  return { perfil, wishlistIds };
}
