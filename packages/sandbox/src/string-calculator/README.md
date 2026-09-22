# String Calculator Kata

Exercício de TDD criado por **Roy Osherove**. Enunciado original: <https://osherove.com/tdd-kata-1>
Abaixo, um resumo dos requisitos em português, com exemplos de entrada e saída.

> ⚠️ **Regra do kata:** leia **um passo por vez** e só avance quando o atual estiver pronto (vermelho → verde → refatorar → commit).
> Não olhe os próximos passos antes da hora: a graça é o código evoluir diante de requisitos que você não previu.

---

## Progresso

- [x] Passo 1: até dois números
- [x] Passo 2: quantidade qualquer de números
- [x] Passo 3: quebra de linha como separador
- [ ] Passo 4: separador personalizado
- [ ] Passo 5: números negativos
- [ ] Passo 6: números maiores que 1000
- [ ] Passo 7: separador com mais de um caractere *(bônus)*
- [ ] Passo 8: vários separadores *(bônus)*
- [ ] Passo 9: vários separadores longos *(bônus)*

---

## Passo 1: até dois números
Crie uma calculadora com um método `add` que recebe uma **string** e devolve um **número**. A string pode ter zero, um ou dois números separados por vírgula, e o método devolve a soma.

| Entrada | Saída |
|---|---|
| `""` | `0` |
| `"1"` | `1` |
| `"1,2"` | `3` |

*Dica do autor:* comece pelo caso mais simples (string vazia) e só depois vá para um e dois números. Refatore a cada teste verde.

## Passo 2: quantidade qualquer de números
O `add` passa a aceitar **qualquer quantidade** de números, não só dois.

| Entrada | Saída |
|---|---|
| `"1,2,3,4,5"` | `15` |

## Passo 3: quebra de linha como separador
Além da vírgula, a **quebra de linha** (`\n`) também separa números.

| Entrada | Saída |
|---|---|
| `"1\n2,3"` | `6` |

*Observação:* uma entrada como `"1,\n"` é inválida, mas **não é preciso tratá-la**. Serve só para deixar claro o formato.

## Passo 4: separador personalizado
A string pode começar com uma linha especial que define o separador, no formato `//<separador>\n`, seguida dos números.

| Entrada | Saída |
|---|---|
| `"//;\n1;2"` | `3` |

Essa primeira linha é **opcional**: todos os cenários anteriores continuam valendo.

## Passo 5: números negativos
Se houver número negativo, o `add` **lança uma exceção** com a mensagem "números negativos não são permitidos" seguida do número. Se houver **vários negativos**, a mensagem mostra **todos**.

| Entrada | Resultado |
|---|---|
| `"1,-2"` | exceção mencionando `-2` |
| `"-1,2,-3"` | exceção mencionando `-1` e `-3` |

*O próprio autor sugere que iniciantes parem aqui na primeira vez.*

## Passo 6: números maiores que 1000
Números **acima de 1000** são ignorados.

| Entrada | Saída |
|---|---|
| `"2,1001"` | `2` |
| `"2,1000"` | `1002` (o 1000 conta) |

## Passo 7: separador com mais de um caractere *(bônus)*
O separador personalizado pode ter **qualquer tamanho**, escrito entre colchetes: `//[<separador>]\n`.

| Entrada | Saída |
|---|---|
| `"//[***]\n1***2***3"` | `6` |

## Passo 8: vários separadores *(bônus)*
É possível definir **mais de um** separador, cada um entre colchetes: `//[<sep1>][<sep2>]\n`.

| Entrada | Saída |
|---|---|
| `"//[*][%]\n1*2%3"` | `6` |

## Passo 9: vários separadores longos *(bônus)*
Combina os passos 7 e 8: vários separadores, **cada um com mais de um caractere**.

| Entrada | Saída |
|---|---|
| `"//[**][%%]\n1**2%%3"` | `6` |

---

## Decisões em aberto

- **Tipo da exceção (passo 5):** `Error` genérico ou uma classe própria (ex.: `NegativeNumberError`)?
- **Espaços ao redor dos números** (ex.: `"4, 5"`): aceitar ou não? Se aceitar, merece um teste próprio.
- **Entradas inválidas** (ex.: `"5abc"`): o kata não define. Anotado na lista de testes, sem implementação por enquanto.

## Regras do ciclo

1. 🔴 Escreva **um** teste e veja-o **falhar**.
2. 🟢 Faça passar com o **mínimo** (vale fingir).
3. 🔵 **Refatore** com o teste verde (código e testes).
4. ✅ **Commit.** Nunca commite no vermelho.

Se um teste nascer verde, faça o **teste do teste**: quebre o código de propósito, confirme que ele falha e desfaça.
