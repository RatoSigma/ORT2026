import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import {useState} from 'react';

export default function App() {
  const [pokemon, setPokemon] = useState('');
  const [pokeInfo, setPokeInfo] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(null);

  async function buscarPokemon(){
    try{
      if(pokemon.trim() === ''){
        alert('Por favor digite um Pokemon válido');
        return;
      }

      setCarregando(true);
      setErro(null);
      setPokeInfo(null);

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

      if (!response.ok) {
        alert('Pokemon não encontrado. Tente novamente!');
        setErro('Pokemon não encontrado');
        return;
      }

      //Converte a resposta do servidor em um json
      const data = await response.json();

      if(data.id){
        setPokeInfo(data);
      }else{
        setPokeInfo(null);
        setErro('Pokemon não encontrado');
        alert('Pokemon não encontrado. Tente novamente!');
      }
      console.log(data);
    }catch(error){
      setErro('Ocorreu um erro ao buscar o Pokemon');
      console.error('Pokemon não encontrado.');
      alert('Pokemon não encontrado. Tente novamente!');
    }finally{
      setCarregando(false);
    }
  }

  const SpritesShowdown = (pokemonData) => {
    if (!pokemonData?.sprites?.other?.showdown) return { normal: null, shiny: null };
    return {
      normal: pokemonData.sprites.other.showdown.front_default,
      shiny: pokemonData.sprites.other.showdown.front_shiny
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pokedex</Text>

      <TextInput 
        style={styles.entrada} placeholder='Informe o Pokemon' onChangeText={setPokemon} 
        value={pokemon} keyboardType='default' />
      
      <Button
        title='Buscar' 
        onPress={buscarPokemon} 
        disabled={carregando}/>

      {carregando && <ActivityIndicator size='large' color='red' style={{marginTop: 20}}/>}

      {erro && <Text style={{fontWeight: 'bold', color: 'red'}}>{erro}</Text>}

      {pokeInfo && (
        <View>
          <View style={styles.spriteC}>
            {(() => {
              const sprites = SpritesShowdown(pokeInfo);
              return (
                <>
                  {sprites.normal && (
                    <View style={styles.spriteW}>
                      <Image 
                        source={{ uri: sprites.normal }}
                        style={styles.sprite}
                        resizeMode="contain"
                      />
                      <Text style={styles.spriteL}>Normal</Text>
                    </View>
                  )}
                  {sprites.shiny && (
                    <View style={styles.spriteW}>
                      <Image 
                        source={{ uri: sprites.shiny }}
                        style={styles.sprite}
                        resizeMode="contain"
                      />
                      <Text style={styles.spriteL}>Shiny</Text>
                    </View>
                  )}
                </>
              );
            })()}
          </View>

          <Text>Nome: {pokeInfo.name}</Text>
          <Text>Tipo(s): {pokeInfo.types.map(t => t.type.name).join(', ')}</Text>
          <Text>Habilidades: {pokeInfo.abilities.map(a => a.ability.name).join(', ')}</Text>
          <Text>HP: {pokeInfo.stats.find(s => s.stat.name === 'hp').base_stat}</Text>
          <Text>Ataque: {pokeInfo.stats.find(s => s.stat.name === 'attack').base_stat}</Text>
          <Text>Ataque Especial: {pokeInfo.stats.find(s => s.stat.name === 'special-attack').base_stat}</Text>
          <Text>Defesa: {pokeInfo.stats.find(s => s.stat.name === 'defense').base_stat}</Text>
          <Text>Defesa Especial: {pokeInfo.stats.find(s => s.stat.name === 'special-defense').base_stat}</Text>
          <Text>Velocidade: {pokeInfo.stats.find(s => s.stat.name === 'speed').base_stat}</Text>
        </View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', backgroundColor: '#ecf0f1', padding: 8,}, 
  titulo: {fontWeight: 'bold', fontSize: 24, textAlign: 'center'},
  entrada: {height: 45, borderWidth: 1, padding: 10, margin: 10, borderRadius: 5},
  spriteC: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 30
  },
  spriteW: {
    alignItems: 'center'
  },
  sprite: {
    width: 120,
    height: 120
  },
  spriteL: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5
  }
});
