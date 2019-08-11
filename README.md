### Breve explicação sobre as libs utilizadas

`react-native-navigation` é utilizado para navegação básica da aplicação.

`react-native-gesture-handler` é uma dependência do `react-native-navigation`
que é utilizada para lidar com gestos do usuário, quando tem algo que
precisa ser arrastado da direita para esquerda, então é necessário
trabalhar com esse tipo de função do usuário. Outro exemplo seria se
o usuário estiver em telas mais internas, o usuário apenas arrastar
a tela e o usuário já irá voltar para as telas anteriores.

Na utilização dessa lib, é necessário fazermos algumas alterações para
que ela funcione corretamente, seguindo a [doc](https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html)
podemos verificar logo após a parte de instalação, alguns passos necessários
e códigos que devemos adicionar em
`android/app/src/main/java/com/<app_name>/MainActivity.java` e adicionar
as linhas de códigos que são citadas na doc.
IMPORTANTE PARA O FUNCIONAMENTO DA LIB NO ANDROID!

`react-native-reanimated` é utilizado para colocar animações entre as
transições de tela.

---

### Acessar API/localhost no Android
Diferente da WEB, no celular temos algumas coisas a levar em consideração,
utilizando o `axios`:

1) Se a aplicação estiver rodando no celular via USB ou Wifi, podemos
utilizar o IP da própria máquina para acessar a api, por exemplo,
`baseURL: http://192.168.0.10:3050` irá funcionar
2) Também podemos utilizar os IP's que os emuladores disponibilizam,
como no Genymotion, podemos utilizar `baseURL: http://10.0.3.2:3050`,
caso esteja no amulador do Android Studio podemos utilizar 
`baseURL: http://10.0.2.2:3050`.
3) Outra forma seria não utilizar nada disso e continuar utilizando
`baseURL: http://localhost:3050` chamado `adb` que fala para o android
para que quando ele tentar acessar a porta `x` para que ele acesse a 
porta `x` mesmo da sua própria máquina.


PS: Sempre que adicionarmos novas dependências ao projeto, é necessário
reinstalar o aplicativo no emulador novamente digitando
`react-native run-android`, caso esteja no IOS será necessário mais alguns
passos após rodar `react-native run-ios`, será necessário entrar na pasta
`ios` e rodar o seguinte comando `pod install`, já que na nova atualização
do React Native, ele já terá a função de auto-linking com as novas
dependências
