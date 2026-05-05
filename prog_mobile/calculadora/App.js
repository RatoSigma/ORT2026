import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useState } from 'react';

const botaos = [
  { label: '+', color: 'limegreen' },
  { label: '-', color: 'mediumvioletred' },
  { label: '*', color: 'darkred' },
  { label: '/', color: 'royalblue' },
];

export default function App() {
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [resultado, setResultado] = useState('0');

  function conversao(valorTexto) {
    const valorNormalizado = valorTexto.replace(',', '.').trim();
    return Number(valorNormalizado);
  }

  function calcular(operacao) {
    const numero1 = conversao(valor1);
    const numero2 = conversao(valor2);

    if (Number.isNaN(numero1) || Number.isNaN(numero2)) {
      setResultado('Erro');
      return;
    }

    if (operacao === '/' && numero2 === 0) {
      setResultado('Erro');
      return;
    }

    let valorFinal = 0;

    switch (operacao) {
      case '+':
        valorFinal = numero1 + numero2;
        break;
      case '-':
        valorFinal = numero1 - numero2;
        break;
      case '*':
        valorFinal = numero1 * numero2;
        break;
      case '/':
        valorFinal = numero1 / numero2;
        break;
      default:
        setResultado('Erro');
        return;
    }

    setResultado(String(valorFinal));
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.wrapper}>
        <View style={styles.calculadora}>
          <View style={styles.container}>
            <Text style={styles.titulo}>CALCULADORA</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="VALOR 01"
            placeholderTextColor="#FF7B7B"
            keyboardType="numeric"
            value={valor1}
            onChangeText={setValor1}
          />

          <TextInput
            style={styles.input}
            placeholder="VALOR 02"
            placeholderTextColor="#FF7B7B"
            keyboardType="numeric"
            value={valor2}
            onChangeText={setValor2}
          />

          <View style={styles.botoes}>
            {botaos.map((button, index) => (
              <View
                key={button.label}
                style={[
                  styles.botao,
                  index === botaos.length - 1
                    ? styles.ultimoBotao
                    : null,
                ]}
              >
                <Button
                  title={button.label}
                  color={button.color}
                  onPress={() => calcular(button.label)}
                />
              </View>
            ))}
          </View>

          <View style={styles.caixa}>
            <Text style={styles.textoFinal}>{resultado}</Text>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculadora: {
    width: '85%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#000000',
    paddingVertical: 26,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },
  container: {
    borderWidth: 1,
    borderColor: '#8CB3E5',
    backgroundColor: '#EAF3FF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  titulo: {
    fontSize: 40,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: 1,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 9,
    paddingHorizontal: 14,
    fontSize: 32,
    color: '#222222',
    marginBottom: 16,
  },
  botoes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 20,
  },
  botao: {
    flex: 1,
    marginRight: 8,
  },
  ultimoBotao: {
    marginRight: 0,
  },
  caixa: {
    height: 64,
    backgroundColor: '#000000',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFinal: {
    color: '#FFFFFF',
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 60,
  },
});
