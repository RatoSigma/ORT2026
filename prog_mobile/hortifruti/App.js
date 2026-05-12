import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import CardProduto from './CardProduto';

const PRODUTOS_INICIAIS = [
  { id: 1, nome: 'Maçã', preco: 5.5, categoria: 'Frutas', imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEUaUfAiEEWLk8m%2B4wf7YQRw7KmKm8iX46HZXgcRkvdY%2ByDuUlmoJE1OhFebjuH%2BDho7HacEhFmENRldJt87rlLqVzzZ%2BVBklCvQPxIzKCbOpQfNa8NdBfnpiW%2BaFeP8hBcAjjvHg6tyJerf1VaoM%2Bp8p8rijwnC%2FCipqUEqPj8wDRADQ2j0gA15%2BYfWGIfsx57C2t6TNzzp%2BS5VZ94Dz8aYBC6X%2FWgDSPycMuRq5q5qdfusYJzNBVFQhZtdJ3doUPZBur87LNr3QIYlG6hIpVniRkGP4vUBmVWn0uAVKXS8pAeyYt27ms2580hpyR5Q2YtQhRc68x3eG0WKzVDlF%2F5g4uaNHCUCp0MyyLnyhDIlaPQu3PyQwMN9%2FVtAj%2FIXCC0DzP3KFSDzU5%2FkcCa1MGWfWoDrXXv%2FqoNOfvqMrfaHPocG5AESv6DDfxIvQOKHajNnDWe9tBj%2FpSHRMH2lKW248WjnsWtROD%2FZSKUQnS8o44Iz%2BVEel5YalWqqIDNPS2NJUZZjeN21aLy9sgRU9yJ580VfNYfr1ptRjZxuWOcSr7xJRfM%2BrdBcnLySj%2BoXad10nvNAWFh%2BZZJJojrTZg%3D%3D&allow_caching=true&sz=w512' },
  { id: 2, nome: 'Ba', preco: 4.0, categoria: 'Frutas', imagem: 'https://assets.realmadrid.com/is/image/realmadrid/1330603286208?$Mobile$&fit=wrap&wid=312' },
  { id: 3, nome: 'Cenoura', preco: 3.0, categoria: 'Legumes', imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fwebp&attachment_token=AOo0EEVUhFs5fUw%2FzazRj60iz0KLH4G8HJphikhNCSZKSsbC6yFCrp%2F0XwLggxYzrcy7ciXM7mymqLHfptQd%2FNCv6Q1dn9H4oWn1C1tBrPJRXCCTad7KOyZePSSvaMsEgRzYR%2FawRwVLK2VvwVhPFxmGwY0IjIQ47E21J%2B4nZbYEyci8yQF5uwtFAvSrNN9005M%2BBj9yvzA2RFz12j7dZA%2FcKZPv2R%2B3xsy3zwqqAQ%2B73DH7ogP5nX%2BfCwF88dhWQiV2z0gpMbVoDQhHqGr0cjytHVp654Jx5eL10Mj7F0nZR4fjP2hUtOvla%2F2rb%2Ba0NpdHy8P%2BFXzxiaujA3usYaikW4%2BvbuCXMXkmJI9QTcDMgt4zWfjj5%2FyXtX2gabon0JO59s4kuViZ%2FU86oa1aTc0MJg8pt8VqnpN0OqxBaPUdKFWf4HgmZxzFmBoUFUSJdLdUS%2Fw2%2Bzww%2FDJxz%2Fh%2FvYgwcSWOvDX%2BBloCdi%2BGTtMckiszRH6gdMKI1y6LIjVUKJgbppIhZYhGpbj92iW2sgoJDFB4jLoBui3PQOb%2Bz4M%2BMITmIN7odxzeDLw6wCVq%2BKEYkYpBAQabu8HwLQ4hAzUZy7Qitr%2FORh4YdEZabmYUQjaKp%2FIwu868ocoYmS7Jx45LbHqx4P%2BMPGLrp%2BkoIZORcUz3fIYyQxrQmK93H%2B%2Be7VJInGV2KnOyz2%2BN6VpQD6zrfWmE2u3f8yg0XKSdMcvHtMFfyK0R4Lk7QMvaJp9Kv39mO3bg7AUKP6df63MHEuM7a3Cj&allow_caching=true&rw=true&sz=w512' },
  { id: 4, nome: 'Batata', preco: 0, categoria: 'Legumes', imagem: 'https://via.https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fwebp&attachment_token=AOo0EEUZdMzcSezKNaljZRoEi98UPCLP%2BXJO41X27p5UJm13UEbvBqlkhJia05macxWRbe8HLyO38ZorJb4uFeOWfLOuF7O0MbWo7nnETMnUrz8KY3d4M6%2BmY0z1fUn80A2UsIpmO1rvWON9f3O4Nw4jYdnms5%2FwjWhJtTpsD1tEzNcPRpZ65Wk1bIKZlJEti1tL%2BXaV4uBeLWDdEzPURxXi8f9CbO9qF8xQmq8Rz0cp3lue6GbTjOs7GPGnjSfdrDcnnqMpbqRql3D%2B2x8mNPHnNHEoliG2895tTP3acPQPzgEm0Z2fHzcg2Q23JjfnDWuz2KE8iVIS9iVBcEEMtoupEcW1WRbmWx6JK8kX3wG3zPnLrhjaNm1EZO1e9gaWduIFidBT7Sek0eJOw1K196wjqjG%2F3KWIYOoCbp4ihWWfkSAjCuuU73NdQJVJ%2FEFqIlcV7MBAkEC83nX3vMkdP0a1%2BHAzlVg8HQbcFHi%2FQDxFE1yzgmqfyil9NOveDUGKgzpo5HjP6m92sSETamQmKY%2B9XRtIimGEWyBZjtJs2OAWgoWHcEqUXU494CtWXASaTwaySVqvIan5jHP75UDPbRF7uGCMrv9vTjbhbaNR7FtR9aeOXsWFV7riqW50AcWM1nGqMnvwFDDDp1qFeot6mgcRo%2FkHmQ8PTA%2BnlWGgc8WppN1yBj%2B1Zfd6nkbIcmpslJZDd3Xnycb8qD%2BLXPXR0KhV%2FghsCMjEs1gl7BPX7nzMqJZfRkf2lyZ3Ym5Xp6o%3D&allow_caching=true&rw=true&sz=w512.com/150' },
  { id: 5, nome: 'Alface', preco: 2.5, categoria: 'Verduras', imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEXOg0ie2Zjqk6ybc9tuLLSDw%2FnPjRfqId5qi2kRaqhft0X1mECZDnUFfrBsvQtJcQJovoT%2B1w2eVQQX6AKqDnGstsQbmmzs7o%2BuM5G%2BNkiL4t53NQgCQKuoANaePjXDa%2BMSnFgUpUlFZf%2FFl7U1PPdZket8nyspLU%2Fnvu%2F7rXCKavlPutUsFzeOen3ZU%2FbSh7%2FkEJdL3S1I4pv%2BFKMlDovmXAzKdSURAQrg%2BihtI8rxp6QvoX8FC2k6mwJm9%2BlpC3NFZNNpa6NFgbjQ5zz4zkLt2N6xcEJ6WJblzjn20%2F0VUqq4vqnKmCntdvp1XokUwNCByStXOvuJjFD1eV5Jm0BToWwDJKhwnipFaYLg%2FDGOM60Nz6hFhO6EFJf0Fpi2mcB323xEjsORoMTyjBCj86rT1ixMWgZ6smpxbOYxnXloXoJTd4faejLvxjukbio0G6AvdKuAqwnEJb2optWagEWAh%2BEr1YWImmRhQgSyj3wfgRQKWTvLoyy5PzNP%2Favn%2FIPOw0h%2BrDapMKlfOF2jgzeFA0NGqBawrIouOKlUm88xgfLmIHOKyqIS4u3CyxcVBvsRmvNZ2QBrAAAUbxXBWrelCJjenXaGmY6jVONrdwHKEcTVkWZ%2BQd5NphRApT5aV11GCpwzjMVw31NJrFYU6Efg1GCXb3UNrfzchZQ%3D&allow_caching=true&sz=w512' },
  { id: 6, nome: 'Tomate', preco: 6.0, categoria: 'Frutas', imagem: 'https://static.vecteezy.com/system/resources/thumbnails/041/491/392/small/ai-generated-tomato-png.png' },
  { id: 7, nome: 'Couve', preco: 3.5, categoria: 'Outros', imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fwebp&attachment_token=AOo0EEWFI7AIVWsyaqqtuDnwnhqtMCKdbO0JMZWgBfEiStgyhJUgOeHo8tmMGnCNwg0hVwoPTnXHpp93zkMcOLtmdqev%2F5UD5c%2Bcgf3m4dGC%2B8DFCUqJDLiRGAurjJKaFzV1Ylqp%2BA4G6f25dh9w%2FbdZYJUA88GGGTEt7GK0oRribEhzZmBlOrqRYE7LVTNBW8xDAA883PPvERaEkFP8L7TTWM43sJm4prcg5Z3Ur5lFaL%2FuUq2RyoFqtlLHWulFsSg%2BxoGyVg6KoBjQqANMtBTYHTZk70j4i41qS6hbMXJjtYaktO3%2F6OLTPMG%2B6Zdjw3lfnsrndN1ZZ92c%2FouCa4XNywUjQ%2BG9WvhxMM9ugLAnZDQ8SKwAG6gaz6TObxjhRPdhs6cqRjXaehqDYowQsD3PX2pLpMJBIxnTBY2qDYSMs%2BRNSyXQeMV9r1ZmnoSp3CrQisRq8sd%2FvJX7EE4jKikkMqmpb9MrhjpQ9aLS3EpSphMh0fjTmfbdNDTBMwGb99BdOrRRZaGFqj1Bu9knJe5%2BmoOnKr%2BSKH71UYR1D7NLoS55zruFyWm7zTKABrlaXLOt9Iiqf5sFHkpDxoM75Xm31jRnLs9rzg5mgBLpTzdF6z80PCqfw73hKmzwLdaNnG9l%2FvmUpoUcAZku9bXDG8fIO%2BlaluQCTZ8H4c7%2FKwmN0EU8EmW6LMrTw5PkGzU2Fnke5Nws7liTcZNmmR4vppFq5i7pn688Pw%2Bc4Th2nzI0KeNcNGXWvRLRMsxY0SxvYOTG7ECMbXXFPubBKUzWJygR9NwFor0dxnFtUf8GM7gEMXXfj7p%2B2cP9IR8CH1MMEnaVSTkSZ1DFTVcomevVLXSfFbuG0vg33EFnLQ%3D%3D&allow_caching=true&rw=true&sz=w512' },
  { id: 8, nome: 'Brócolis', preco: 4.5, categoria: 'Verduras', imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEW6Sf8iNm8SnT1XHyOx8l%2B9mAiIenyNZssHCv634U4fOn5Ymq24wtl9jG%2BBEXsMvSc9g%2Bcnywurnd1SVk66HuB%2Frl3ikljo0hChsdnBzRlE3QAarcGUJLMON0JJvEk0VYB1o3UrYDieqikiXIY4fnAF9M6JlWdEydeWCb4XP8TBnHKe2h5ckOyGKIt9GQEu5Y7az8ixenhhA4Txi17fPmBCo6zFKs0MhDUI9Ho1Q%2BjgBxSVuYEW77qSUSI3%2Bmqvi%2FEUqfICeCDu2Olft4BlWFsZaaaM%2BkSocoplLW1RblScCCXXa%2ByQri0RBmJxKcz9q2XAy4jGyNocvhkjDLLEoJ%2Fet79vX%2BNo9uMzKMj9I3WWdA5bJB9%2BPshlEWmJ%2F9l5yd9puapC1DFdY6a%2BU%2ByNF8eF0GLH8AEpYzaGfgRFN5T1mgtqQaV6l%2Fl7YomWtvqYxFgUw6J3kWoTtrSDxl%2BJoEeZ2ucQnQP%2BNcGdbywBg78HjXLx8qjj5RVZUSMQoCtqKuuIg1Tb2Wbwv6fzgTIZ5KUdpMY3XOYEUg3UFb9u99YMPOQI5xJNiTo%2FPY%2FXHEiOBgCEQ9Fl0faqxJnsxF4TSobea8oq2JVQgqa2vmrmWonf7j%2B9YobcPDCkJ5K89vNBH05TJK7EpFCmdJof7Mg%3D&allow_caching=true&sz=w512' },
  { id: 9, nome: 'Banana', preco: 4.2, categoria: 'Frutas', imagem: 'https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEWvCfpgyafQ%2FSlY53a%2BewEI8rU%2Fo7RNikunQrKaC7PHzDtXjD3TR9sOVesLjYy%2BDcbbBMymn6WjPYkkavC1%2BrwuV79RXQkrHKpG%2Fc5Gw5d%2FnKAR%2BI7zGdY1A%2FN0vSVKi1CkC%2FOAxx20iGOB51W7srU9gI2k8FzJBS2NEF1QSSfkQbzcsLtarwtcW2Dy5SptdYdy%2BtyV5dusfBXvmRwdrSKjnkDmmkcOMOP%2Bbt%2FgkNE9yXZKhcka2p6h8ufSAsCigwrLyHEb5COAhrs2j15oqgDvsqYzbnQr8pKRv7f8yelaM331HLfqGBGRVRxSU2RkXFFGQ3aclvjTtTDWto4PK8fbv1tMkU%2FqXRRmshb8wVoJDnSMmyDd2A2iSpzafv5ribZyqiR7Mg2mPQ8gNP5NyOQ8o4JrFoh%2BIod48jIrpTAvtXeER7KOOuDiG6rXa5NjTUlm9mn0p%2BM59LCdQX0U6ZNmZmx9DXbCOAgOoz8JFM6EbdKUTbJjrysM%2FdiAryqglwYPJYHcNPikxdE%2Bnft3%2FmNVPX09VpCqnn0YIWGuVzkC0QE6aa%2B1yETqdzJDqxl1bJi9n1H88KVF5AdjOgle&allow_caching=true&sz=w512' },
];

const CATEGORIAS_PERMITIDAS = ['Frutas', 'Legumes', 'Verduras'];

export default function App() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [produtos, setProdutos] = useState(PRODUTOS_INICIAIS);
  
  const [novoNome, setNovoNome] = useState('');
  const [novoPreco, setNovoPreco] = useState('');
  const [novaImagem, setNovaImagem] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('Frutas');
  const [mensagemErro, setMensagemErro] = useState('');

  const adicionarProduto = () => {
    setMensagemErro('');

    const precoNum = parseFloat(novoPreco);

    const nomeValido = novoNome.trim().length >= 3;
    const precoValido = !isNaN(precoNum) && precoNum > 0;
    const categoriaValida = CATEGORIAS_PERMITIDAS.includes(novaCategoria);

    if (!nomeValido) {
      setMensagemErro('O nome do produto deve ter pelo menos 3 caracteres.');
      return;
    }
    if (!precoValido) {
      setMensagemErro('O preço deve ser um número maior que zero.');
      return;
    }
    if (!categoriaValida) {
      setMensagemErro('Categoria inválida.');
      return;
    }

    const novoProduto = {
      id: Date.now(),
      nome: novoNome.trim(),
      preco: precoNum,
      categoria: novaCategoria,
      imagem: novaImagem.trim() || 'https://via.placeholder.com/150',
    };

    setProdutos([...produtos, novoProduto]);
    
    setNovoNome('');
    setNovoPreco('');
    setNovaImagem('');
  };

  const produtosFiltrados = produtos.filter(produto => {
    const nomeValido = produto.nome && produto.nome.length >= 3;
    const precoValido = typeof produto.preco === 'number' && produto.preco > 0;
    const categoriaValida = CATEGORIAS_PERMITIDAS.includes(produto.categoria);

    if (!nomeValido || !precoValido || !categoriaValida) {
      return false; 
    }

    if (categoriaAtiva === 'Todos') {
      return true;
    }
    return produto.categoria === categoriaAtiva;
  });

  const botoesFiltro = ['Todos', 'Frutas', 'Legumes', 'Verduras'];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Hortifruti</Text>

      <View style={styles.formContainer}>
        <Text style={styles.formTitulo}>Adicionar Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto (min. 3 letras)"
          value={novoNome}
          onChangeText={setNovoNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço (ex: 5.50)"
          value={novoPreco}
          onChangeText={setNovoPreco}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="URL da Imagem (opcional)"
          value={novaImagem}
          onChangeText={setNovaImagem}
        />
        <View style={styles.pickerContainer}>
          {CATEGORIAS_PERMITIDAS.map(cat => (
            <View key={cat} style={styles.buttonWrapper}>
              <Button
                title={cat}
                color={novaCategoria === cat ? '#ffa500' : '#888'}
                onPress={() => setNovaCategoria(cat)}
              />
            </View>
          ))}
        </View>
        <View style={styles.buttonWrapperAdicionar}>
            <Button 
              title="Adicionar ao Catálogo" 
              color="#2e8b57" 
              onPress={adicionarProduto} 
            />
          </View>

          {mensagemErro !== '' && (
            <Text style={styles.mensagemErro}>{mensagemErro}</Text>
          )}
        </View>
        
        <View style={styles.filtros}>
          {botoesFiltro.map(cat => (
            <View key={cat} style={styles.buttonWrapperFiltro}>
              <Button
                title={cat}
                color={categoriaAtiva === cat ? '#2e8b57' : '#888'}
                onPress={() => setCategoriaAtiva(cat)}
              />
            </View>
          ))}
        </View>

        <ScrollView style={styles.lista} contentContainerStyle={styles.listaContent}>
          {produtosFiltrados.map(produto => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
          
          {produtosFiltrados.length === 0 && (
            <Text style={styles.mensagemVazio}>Nenhum produto encontrado para esta categoria.</Text>
          )}
        </ScrollView>

        <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2e8b57',
  },
  formContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  formTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonWrapperAdicionar: {
    marginBottom: 5,
    marginTop: 5,
  },
  mensagemErro: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonWrapperFiltro: {
    flex: 1,
    marginHorizontal: 2,
  },
  lista: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listaContent: {
    paddingBottom: 30,
  },
  mensagemVazio: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  }
});
