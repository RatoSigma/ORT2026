import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { jogos } from '../data/jogos';
import {
  obterDadosIniciais,
  PERFIL_PADRAO,
  salvarPerfil,
  salvarWishlistIds,
} from '../dao/AppStorageDAO';
import { getTheme } from '../theme/theme';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [perfil, setPerfil] = useState(PERFIL_PADRAO);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await obterDadosIniciais();
        setPerfil(dados.perfil);
        setWishlistIds(dados.wishlistIds);
      } catch (error) {
        console.error('Erro ao carregar os dados do aplicativo.', error);
        setErroCarregamento('Não foi possível carregar os dados salvos. Feche e abra o app novamente.');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const alternarFavorito = useCallback(
    async (jogoId) => {
      const proximaLista = wishlistIds.includes(jogoId)
        ? wishlistIds.filter((id) => id !== jogoId)
        : [...wishlistIds, jogoId];

      await salvarWishlistIds(proximaLista);
      setWishlistIds(proximaLista);
      setErroCarregamento('');
      return proximaLista.includes(jogoId);
    },
    [wishlistIds]
  );

  const salvarConfiguracoes = useCallback(
    async (nickname, darkMode) => {
      const perfilAnterior = perfil;
      const perfilAtualizado = {
        nickname: nickname.trim() || PERFIL_PADRAO.nickname,
        darkMode,
      };

      setPerfil(perfilAtualizado);

      try {
        await salvarPerfil(perfilAtualizado);
        setErroCarregamento('');
      } catch (error) {
        setPerfil(perfilAnterior);
        throw error;
      }
    },
    [perfil]
  );

  const obterJogoPorId = useCallback((jogoId) => jogos.find((jogo) => jogo.id === jogoId), []);

  const jogoDestaque = useMemo(
    () => jogos.find((jogo) => jogo.destaque) || jogos[0],
    []
  );

  const outrosJogos = useMemo(
    () => jogos.filter((jogo) => jogo.id !== jogoDestaque?.id),
    [jogoDestaque]
  );

  const wishlistJogos = useMemo(
    () => jogos.filter((jogo) => wishlistIds.includes(jogo.id)),
    [wishlistIds]
  );

  const value = useMemo(
    () => ({
      carregando,
      erroCarregamento,
      perfil,
      theme: getTheme(perfil.darkMode),
      jogos,
      jogoDestaque,
      outrosJogos,
      wishlistIds,
      wishlistJogos,
      isFavorito: (jogoId) => wishlistIds.includes(jogoId),
      obterJogoPorId,
      alternarFavorito,
      salvarConfiguracoes,
    }),
    [
      alternarFavorito,
      carregando,
      erroCarregamento,
      obterJogoPorId,
      outrosJogos,
      perfil,
      jogoDestaque,
      wishlistIds,
      wishlistJogos,
      salvarConfiguracoes,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
