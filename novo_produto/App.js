import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [codigo, setCodigo] = useState('');
  const [erros, setErros] = useState({});
  const [produto, setProduto] = useState(null);

  const limparFormulario = () => {
    setNome('');
    setPreco('');
    setQuantidade('');
    setCodigo('');
    setErros({});
  };

  const validarFormulario = () => {
    const novosErros = {};
    const nomeLimpo = nome.trim();
    const precoLimpo = preco.trim().replace(',', '.');
    const quantidadeLimpa = quantidade.trim();
    const codigoLimpo = codigo.trim().toUpperCase();
    const regexCodigo = /^[A-Z]{3}\d{4}$/;

    if (!nomeLimpo) {
      novosErros.nome = 'O nome do produto e obrigatorio.';
    } else if (nomeLimpo.length < 3) {
      novosErros.nome = 'O nome deve ter pelo menos 3 caracteres.';
    } else if (!/^[A-Za-z\s]+$/.test(nomeLimpo)) {
      novosErros.nome = 'O nome deve conter apenas letras.';
    }

    if (!precoLimpo) {
      novosErros.preco = 'O preco e obrigatorio.';
    } else {
      const precoNumero = Number(precoLimpo);

      if (Number.isNaN(precoNumero) || precoNumero <= 0) {
        novosErros.preco = 'O preco deve ser maior que zero.';
      }
    }

    if (!quantidadeLimpa) {
      novosErros.quantidade = 'A quantidade em estoque e obrigatoria.';
    } else {
      const quantidadeNumero = Number(quantidadeLimpa);

      if (Number.isNaN(quantidadeNumero)) {
        novosErros.quantidade = 'Informe um numero valido para a quantidade.';
      } else if (quantidadeNumero < 0) {
        novosErros.quantidade = 'A quantidade nao pode ser negativa.';
      }
    }

    if (!codigoLimpo) {
      novosErros.codigo = 'O codigo identificador e obrigatorio.';
    } else if (!regexCodigo.test(codigoLimpo)) {
      novosErros.codigo =
        'Formato invalido. Use 3 letras e 4 numeros (Ex. ABC1234).';
    } else {
      const somaDigitos = codigoLimpo
        .slice(-4)
        .split('')
        .reduce((total, digito) => total + Number(digito), 0);
      const quantidadeNumero = Number(quantidadeLimpa);

      if (!Number.isNaN(quantidadeNumero) && somaDigitos !== quantidadeNumero) {
        novosErros.codigo =
          'A soma dos 4 ultimos digitos deve ser igual a quantidade em estoque.';
      }
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleGravar = () => {
    if (!validarFormulario()) {
      return;
    }

    const produtoSalvo = {
      nome: nome.trim(),
      preco: Number(preco.trim().replace(',', '.')),
      quantidade: Number(quantidade.trim()),
      codigo: codigo.trim().toUpperCase(),
    };

    setProduto(produtoSalvo);
    limparFormulario();
    alert('Produto cadastrado com sucesso!');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <View />
        </View>

        <Text style={styles.title}>Novo Produto</Text>
        <Text style={styles.subtitle}>Preencha os dados do inventario</Text>

        <View style={styles.form}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Nome do Produto</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Teclado Mecanico"
              placeholderTextColor="#94A3B8"
              style={[styles.input, erros.nome && styles.inputError]}
            />
            {erros.nome && <Text style={styles.errorText}>{erros.nome}</Text>}
          </View>

          <View style={styles.row}>
            <View style={[styles.fieldContainer, styles.halfField]}>
              <Text style={styles.label}>Preco (R$)</Text>
              <TextInput
                value={preco}
                onChangeText={setPreco}
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                style={[styles.input, erros.preco && styles.inputError]}
              />
              {erros.preco && <Text style={styles.errorText}>{erros.preco}</Text>}
            </View>

            <View style={[styles.fieldContainer, styles.halfField]}>
              <Text style={styles.label}>Estoque</Text>
              <TextInput
                value={quantidade}
                onChangeText={setQuantidade}
                placeholder="0"
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                style={[styles.input, erros.quantidade && styles.inputError]}
              />
              {erros.quantidade && (
                <Text style={styles.errorText}>{erros.quantidade}</Text>
              )}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Codigo Identificador</Text>
            <TextInput
              value={codigo}
              onChangeText={setCodigo}
              placeholder="ABC1234"
              placeholderTextColor="#94A3B8"
              autoCapitalize="characters"
              maxLength={7}
              style={[styles.input, erros.codigo && styles.inputError]}
            />
            {erros.codigo && <Text style={styles.errorText}>{erros.codigo}</Text>}
          </View>

          <View style={styles.buttonWrapper}>
            <Button title="Gravar Produto" color="#3267E3" onPress={handleGravar} />
          </View>
        </View>

        {produto && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Produto Cadastrado</Text>
            <Text style={styles.cardText}>Nome: {produto.nome}</Text>
            <Text style={styles.cardText}>Preco: R$ {produto.preco.toFixed(2)}</Text>
            <Text style={styles.cardText}>Quantidade: {produto.quantidade}</Text>
            <Text style={styles.cardText}>Codigo: {produto.codigo}</Text>
          </View>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 320,
  },
  logoBox: {
    alignSelf: 'center',
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#DCE9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2A44',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6B8BB6',
    marginTop: 3,
    marginBottom: 16,
  },
  form: {
    padding: 0,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfField: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    height: 38,
    borderWidth: 1,
    borderColor: '#E57373',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F7EEEE',
    fontSize: 13,
    color: '#0F172A',
  },
  inputError: {
    borderColor: '#F16D6D',
    backgroundColor: '#F7EEEE',
  },
  errorText: {
    marginTop: 5,
    fontSize: 10,
    color: '#F04F4F',
  },
  buttonWrapper: {
    marginTop: 6,
  },
  card: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DCE9FF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
  },
});
