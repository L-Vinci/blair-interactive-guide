/* ==========================================
   BLAIR INVESTIGATOR PANEL - CORE JAVASCRIPT
   ========================================== */

// 1. Ghost Database
const ghostsData = [
    {
        id: "banshee",
        name: "Banshee",
        evidences: ["emf", "temp", "sls"],
        tags: ["standard"],
        huntThreshold: 50,
        behavior: "Foca em um único jogador por vez (o seu alvo). Ela ignorará os outros até que o alvo morra ou saia.",
        strength: "Capacidade de perseguir persistentemente o mesmo jogador e gritar assustadoramente no microfone parabólico.",
        weakness: "Se o seu alvo estiver fora da casa assombrada, ela se torna muito passiva.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Padrão. Focada em cantos, suspiros e eventos sonoros.",
        huntBehavior: "Persegue apenas o seu alvo designado. Ignora os outros jogadores se o alvo estiver escondido ou fora.",
        speedType: "constant",
        activityType: "standard",
        sanityType: "standard",
        passive: "Grita a 50dB no Microfone Parabólico (som exclusivo de choro/susto).",
        proTip: "Se a Banshee estiver perseguindo alguém escondido no caminhão, o restante da equipe pode andar livremente pelo mapa sem risco de morte."
    },
    {
        id: "demon",
        name: "Demon",
        evidences: ["temp", "book", "box"],
        tags: ["aggressive"],
        huntThreshold: 100,
        behavior: "O fantasma mais hostil do jogo. Ele pode atacar a qualquer momento, mesmo com 100% de sanidade.",
        strength: "Inicia caçadas com extrema frequência e ignora limites normais de sanidade.",
        weakness: "Odeia crucifixos. O alcance do crucifixo é expandido contra ele e impede caçadas por mais tempo.",
        speedDetail: "Normal (1.7 m/s) inicial, ganha +0.1 m/s a cada caçada bem-sucedida.",
        activityDetail: "Extrema. Escreve em livros, bate portas e apaga luzes sem parar.",
        huntBehavior: "Caça muito cedo e frequentemente. Recomenda-se espalhar crucifixos pela sala dele.",
        speedType: "variable",
        activityType: "high",
        sanityType: "early",
        passive: "Recarrega o tempo de espera entre caçadas em apenas 20 segundos (o padrão é 30s-45s).",
        proTip: "Coloque 2 crucifixos no chão do quarto de origem; contra o Demon, o raio de proteção aumenta de 3m para 5m."
    },
    {
        id: "faejkur",
        name: "Faejkur",
        evidences: ["emf", "temp", "book"],
        tags: ["blair-special"],
        huntThreshold: 50,
        behavior: "Uma criatura imitadora. Gosta de replicar barulhos ambientais e interações feitas pelos jogadores para despistá-los.",
        strength: "Sua habilidade de mímica torna difícil prever suas ações com base no som.",
        weakness: "Seus sons imitados costumam ocorrer logo após os jogadores interagirem, revelando sua identidade.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Alta. Imita sons de portas batendo e passos falsos.",
        huntBehavior: "Pode soltar áudios de caçada falsos antes de atacar.",
        speedType: "constant",
        activityType: "high",
        sanityType: "standard",
        passive: "Imita barulhos de passos e portas exatamente 1.5s após qualquer jogador interagir com um objeto.",
        proTip: "Fique atento: se você tocar em uma porta e ouvir outra porta bater logo em seguida a 1 metro de você, é forte indício de Faejkur."
    },
    {
        id: "harrow",
        name: "Harrow",
        evidences: ["book", "orbs", "sls"],
        tags: ["blair-special", "speed"],
        huntThreshold: 50,
        behavior: "Fantasma territorialista. Nunca muda de cômodo favorito e se recusa a vagar para longe.",
        strength: "Move-se com velocidade devastadora enquanto estiver dentro ou muito próximo do seu cômodo favorito.",
        weakness: "Fica extremamente lento ao ser atraído para fora de sua área territorial.",
        speedDetail: "Territorial (2.5 m/s perto do quarto favorito / 1.0 m/s longe dele).",
        activityDetail: "Padrão. Nunca sai ou migra da sua sala de origem.",
        huntBehavior: "Letal na sala favorita. Tente atraí-lo para corredores longos para desacelerá-lo.",
        speedType: "variable",
        activityType: "standard",
        sanityType: "standard",
        passive: "Supervelocidade (2.5 m/s) ativada apenas dentro da zona territorial de 8 metros.",
        proTip: "Corra direto para o lado oposto da casa durante a caçada; longe da sala dele ele fica tão lento (1.0 m/s) que você pode despistá-lo andando."
    },
    {
        id: "jiangshi",
        name: "Jiangshi",
        evidences: ["temp", "uv", "sls"],
        tags: ["blair-special"],
        huntThreshold: 50,
        behavior: "Inspirado no vampiro saltador chinês. Tem o costume obsessivo de repetir interações exatamente três vezes seguidas.",
        strength: "Tenta confundir investigadores com eventos repetitivos na mesma porta ou interruptor.",
        weakness: "Em caçadas, pode pular passos (áudio do passo desaparece em intervalos), e tem chance de saltar sobre o sal.",
        speedDetail: "Saltador (média de 1.7 m/s, com solavancos de velocidade).",
        activityDetail: "Alta. Realiza interações triplas consecutivas em portas e luzes.",
        huntBehavior: "Seu áudio de passos some periodicamente durante as caçadas devido aos saltos.",
        speedType: "variable",
        activityType: "high",
        sanityType: "standard",
        passive: "Executa a mesma interação (acender luz, bater porta, derrubar item) exatamente 3 vezes seguidas.",
        proTip: "Espalhe sal na porta. Se ele passar flutuando/saltando sem deixar marcas de pegadas 3 vezes, confirme Jiangshi."
    },
    {
        id: "krasue",
        name: "Krasue",
        evidences: ["emf", "temp", "uv"],
        tags: ["blair-special"],
        huntThreshold: 50,
        behavior: "Aparece como uma cabeça flutuante com órgãos. Inicia caçadas de locais completamente imprevisíveis no mapa.",
        strength: "Não pode ser contida facilmente pelo quarto de origem devido ao seu spawn de caçada aleatório.",
        weakness: "Odeia o fogo. A proximidade com chamas de velas acesas ou isqueiros reduz drasticamente sua velocidade de caçada.",
        speedDetail: "Rápido (1.9 m/s) por padrão / Super Lento (0.9 m/s) perto de velas ou isqueiros.",
        activityDetail: "Padrão. Atividade regular.",
        huntBehavior: "Inicia a caçada fora do quarto favorito. Ande sempre com velas para desacelerá-la.",
        speedType: "variable",
        activityType: "standard",
        sanityType: "standard",
        passive: "Seu ponto de spawn de caçada é 100% aleatório no mapa.",
        proTip: "Segure uma vela acesa na mão durante a caçada; o calor reduz a velocidade de caçada da Krasue para ridículos 0.9 m/s."
    },
    {
        id: "lament",
        name: "Lament",
        evidences: ["emf", "orbs", "box"],
        tags: ["blair-special"],
        huntThreshold: 50,
        behavior: "O mestre dos truques. Consegue fingir que uma caçada terminou apagando as luzes piscantes antes da hora.",
        strength: "Engana jogadores para fazê-los sair do esconderijo antes da caçada realmente acabar.",
        weakness: "Seus passos tornam-se completamente silenciosos se você estiver longe, permitindo deduzir seu truque.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Tímido. Evita interagir se houver jogadores vigiando a sala.",
        huntBehavior: "Apaga as luzes piscantes do local fingindo o fim da caçada. Fique escondido até ouvir o sumiço real do som.",
        speedType: "constant",
        activityType: "shy",
        sanityType: "standard",
        passive: "Cancela os efeitos estroboscópicos das luzes da casa 5 segundos antes da caçada realmente finalizar.",
        proTip: "NUNCA saia do armário só porque a luz parou de piscar. Espere o som estridente da caçada sumir completamente."
    },
    {
        id: "mare",
        name: "Mare",
        evidences: ["temp", "box", "sls"],
        tags: ["aggressive"],
        huntThreshold: 60,
        behavior: "O fantasma da escuridão. Adora apagar lâmpadas e desligar o disjuntor geral da casa.",
        strength: "Muito mais propensa a caçar se as luzes da sala estiverem desligadas.",
        weakness: "Não consegue iniciar caçadas normais se a luz principal de sua sala estiver acesa.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Alta. Quebra lâmpadas e desliga o disjuntor constantemente.",
        huntBehavior: "Caça muito cedo (60% de sanidade) se o ambiente estiver escuro.",
        speedType: "constant",
        activityType: "high",
        sanityType: "early",
        passive: "Tem 80% de chance de apagar a luz da sala no exato segundo em que o jogador acende o interruptor.",
        proTip: "Deixe a luz do quarto favorita SEMPRE acesa. Se ela apagar a luz instantaneamente ao você ligar, é confirmação de Mare."
    },
    {
        id: "nook",
        name: "Nook",
        evidences: ["emf", "temp", "orbs"],
        tags: ["blair-special"],
        huntThreshold: 50,
        behavior: "O andarilho. Muda de cômodo favorito com frequência extrema, buscando sempre locais com mais itens para interagir.",
        strength: "Muda de sala ativamente mesmo em dificuldades fáceis e médias, confundindo a busca por temperaturas.",
        weakness: "Deixa um rastro constante de atividades ao migrar de um local a outro.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Alta. Interage com objetos diferentes toda vez que muda de sala.",
        huntBehavior: "Costuma caçar de salas inesperadas para onde migrou recentemente.",
        speedType: "constant",
        activityType: "high",
        sanityType: "standard",
        passive: "Migra de quarto favorito a cada 90 segundos sem necessidade de eventos estressantes.",
        proTip: "Espalhe sensores de movimento em corredores chave para acompanhar as constantes trocas de sala do Nook."
    },
    {
        id: "oni",
        name: "Oni",
        evidences: ["book", "uv", "sls"],
        tags: ["aggressive"],
        huntThreshold: 50,
        behavior: "Forte e extremamente ativo nos primeiros minutos da partida, arremessando objetos e se manifestando fisicamente.",
        strength: "Causa pânico inicial acelerando o dreno de sanidade do grupo através de aparições frequentes.",
        weakness: "Perde forças conforme o tempo passa. Sal, crucifixos e Smudge Sticks o enfraquecem muito mais que os outros.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Extrema no início. Arremessa objetos longe e faz eventos físicos constantes.",
        huntBehavior: "Faz aparições físicas completas em vez de apenas sombras. Suas manifestações drenam muita sanidade.",
        speedType: "constant",
        activityType: "high",
        sanityType: "standard",
        passive: "Aparece em formato corporal completo (100% visível) durante eventos paranormais em vez de vultos.",
        proTip: "Tirar fotos das manifestações físicas do Oni reduz o dreno de sanidade e faz ele cancelar o evento imediatamente."
    },
    {
        id: "phantom",
        name: "Phantom",
        evidences: ["sls", "uv", "orbs"],
        tags: ["standard"],
        huntThreshold: 50,
        behavior: "Uma aparição espectral que drena sua sanidade mental a passos largos se você olhar diretamente para ela.",
        strength: "Olhar para ele durante eventos consome sanidade quase instantaneamente.",
        weakness: "Tirar uma foto dele com a câmera fotográfica faz com que desapareça imediatamente.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Padrão. Atividade mediana.",
        huntBehavior: "Fica invisível por períodos mais longos durante a caçada, piscando raramente.",
        speedType: "constant",
        activityType: "standard",
        sanityType: "standard",
        passive: "Fica invisível por 1 a 2 segundos a mais entre as piscas corporais durante caçadas.",
        proTip: "Se você tirar uma foto do Phantom durante um evento, ele sumirá na hora e a foto impressa não mostrará a imagem dele."
    },
    {
        id: "poltergeist",
        name: "Poltergeist",
        evidences: ["uv", "orbs", "box"],
        tags: ["aggressive"],
        huntThreshold: 50,
        behavior: "O espírito arremessador. Gosta de jogar múltiplos objetos pela sala ao mesmo tempo.",
        strength: "Capaz de usar itens do ambiente como armas sonoras e físicas constantes.",
        weakness: "Fica completamente vulnerável e reduz sua atividade a quase zero em salas sem objetos móveis.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Extrema. Lança dezenas de itens ao mesmo tempo em uma explosão de atividade.",
        huntBehavior: "Arremessa objetos próximos de segundo em segundo enquanto vaga nas caçadas.",
        speedType: "constant",
        activityType: "high",
        sanityType: "standard",
        passive: "Pode acionar uma explosão de arremessos (Polter-Explosion) jogando até 5 objetos ao mesmo tempo.",
        proTip: "Esvazie o quarto dele! Remova todas as xícaras, pratos e livros do cômodo; sem itens o Poltergeist fica inofensivo."
    },
    {
        id: "revenant",
        name: "Revenant",
        evidences: ["emf", "book", "uv"],
        tags: ["speed", "aggressive"],
        huntThreshold: 50,
        behavior: "O predador veloz. Move-se de forma letárgica enquanto vaga, mas corre a velocidades surreais se avistar um jogador.",
        strength: "Velocidade absurda ao ganhar linha de visão direta com qualquer investigador.",
        weakness: "Esconder-se atrás de paredes e portas quebra a linha de visão, fazendo-o voltar ao seu ritmo extremamente lento.",
        speedDetail: "Lento (1.0 m/s) sem visão / Extremo (3.0 m/s) se avistar jogadores.",
        activityDetail: "Padrão. Atividade regular.",
        huntBehavior: "Mortal em corredores retos. Quebre a linha de visão imediatamente e esconda-se.",
        speedType: "los_accel",
        activityType: "standard",
        sanityType: "standard",
        passive: "Aceleração instantânea para 3.0 m/s no milissegundo em que ganha linha de visão direta.",
        proTip: "Ao ver o Revenant caçar, não tente correr em linha reta! Dobre a primeira esquina e entre em um armário para ele desacelerar."
    },
    {
        id: "shade",
        name: "Shade",
        evidences: ["emf", "book", "sls"],
        tags: ["standard"],
        huntThreshold: 35,
        behavior: "O fantasma tímido. Reduz quase toda a sua atividade se houver mais de um jogador na mesma sala.",
        strength: "Muito difícil de obter evidências se o grupo insistir em andar junto.",
        weakness: "Não consegue iniciar caçadas normais se houver um jogador na mesma sala que ele.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Tímida. Quase não joga objetos ou apaga luzes se houver pessoas por perto.",
        huntBehavior: "Só começa a caçar com sanidade abaixo de 35%. Nunca inicia a caçada se você estiver no mesmo quarto.",
        speedType: "constant",
        activityType: "shy",
        sanityType: "late",
        passive: "Bloqueia 90% das interações e caçadas se houver 2 ou mais investigadores dentro da mesma sala.",
        proTip: "Deixe apenas 1 caçador sozinho no quarto com a Spirit Box ou Livro. O Shade não interagirá com o grupo reunido."
    },
    {
        id: "spirit",
        name: "Spirit",
        evidences: ["book", "uv", "box"],
        tags: ["standard"],
        huntThreshold: 50,
        behavior: "O fantasma mais equilibrado do jogo. Não possui habilidades especiais ativas exageradas.",
        strength: "Sua falta de comportamentos bizarros o torna difícil de deduzir apenas por observação.",
        weakness: "O incenso (Smudge Stick) o atordoa pelo dobro do tempo normal, impedindo caçadas por 180 segundos.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Padrão. Comportamento equilibrado.",
        huntBehavior: "Não possui táticas especiais além do comportamento padrão de caçada.",
        speedType: "constant",
        activityType: "standard",
        sanityType: "standard",
        passive: "Sensibilidade extrema a incenso de purificação.",
        proTip: "Acender um Incenso na sala do Spirit impede caçadas ativas por impressionantes 180 segundos (3 minutos)."
    },
    {
        id: "strigoi",
        name: "Strigoi",
        evidences: ["emf", "uv", "orbs"],
        tags: ["blair-special"],
        huntThreshold: 50,
        behavior: "Um caçador persistente. Produz bastante evidência física como pegadas UV ao caminhar.",
        strength: "Muito ativo no quesito interação física e abertura de portas.",
        weakness: "Fácil de rastrear devido ao alto volume de marcas táteis deixadas no ambiente.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Alta. Abre portas de armários e bate portas constantemente.",
        huntBehavior: "Deixa pegadas e barulho de portas frequentes nas rotas de caça.",
        speedType: "constant",
        activityType: "high",
        sanityType: "standard",
        passive: "Produz impressões digitais/táteis UV com 95% de probabilidade ao tocar em portas ou janelas.",
        proTip: "Passe a lanterna UV em todas as portas do corredor; o Strigoi deixa rastros táteis quase sem falhar."
    },
    {
        id: "vuult",
        name: "Vuult",
        evidences: ["emf", "orbs", "sls"],
        tags: ["blair-special", "aggressive"],
        huntThreshold: 50,
        behavior: "Fantasma elétrico. Sua taxa de caçada flutua de acordo com pontos de energia que acumula no disjuntor.",
        strength: "Pode danificar ou quebrar temporariamente o Leitor EMF dos jogadores durante surtos de energia.",
        weakness: "Sua proximidade causa falhas absurdas em lanternas de longe, facilitando prever de onde está vindo.",
        speedDetail: "Normal (1.7 m/s) com rajadas rápidas se o disjuntor estiver ativo.",
        activityDetail: "Alta. Causa interferências constantes em luzes e disjuntores.",
        huntBehavior: "Pisca a lanterna dos jogadores mesmo a longas distâncias durante caçadas.",
        speedType: "variable",
        activityType: "high",
        sanityType: "standard",
        passive: "Causa surtos elétricos nas lanternas dos caçadores a até 15 metros de distância.",
        proTip: "Se sua lanterna começar a piscar quando você ainda estiver muito longe da sala assombrada, suspeite de Vuult."
    },
    {
        id: "wraith",
        name: "Wraith",
        evidences: ["temp", "orbs", "sls"],
        tags: ["blair-special"],
        huntThreshold: 50,
        behavior: "Espectro voador. Ele levita alguns centímetros acima do solo, nunca tocando os pisos da casa.",
        strength: "Pode flutuar através de paredes sólidas para perseguir ou surpreender jogadores. Não faz barulho de passos comuns.",
        weakness: "Nunca deixa marcas de pegadas físicas ou térmicas ao passar pelo sal jogado no chão.",
        speedDetail: "Flutuante (1.7 m/s) - Atravessa paredes.",
        activityDetail: "Padrão. Atividade regular.",
        huntBehavior: "Não produz sons de passos. Pode cortar caminho pelas paredes para te cercar.",
        speedType: "constant",
        activityType: "standard",
        sanityType: "standard",
        passive: "Levita acima do solo e é imune ao toque no chão.",
        proTip: "Jogue sal na porta do quarto. Se o fantasma interagir na sala mas NUNCA deixar pegadas no sal, confirme Wraith."
    },
    {
        id: "yama",
        name: "Yama",
        evidences: ["book", "box", "sls"],
        tags: ["blair-special"],
        huntThreshold: 50,
        behavior: "Entidade errante. Toda vez que vaga, escolhe um quarto favorito diferente. Emite rugidos na Spirit Box.",
        strength: "Muda constantemente a zona de perigo do mapa. Pode fazer o SLS Rig vagar de forma autônoma.",
        weakness: "Purificá-lo com incenso bloqueia sua capacidade de trocar de sala favorita por 2 minutos.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Alta. Muda de cômodo favorito a cada 2 minutos.",
        huntBehavior: "Emite um som especial na Spirit Box. Bloqueie suas mudanças usando incenso.",
        speedType: "constant",
        activityType: "high",
        sanityType: "standard",
        passive: "Emite um rugido sobrenatural metálico exclusivo quando responde através da Spirit Box.",
        proTip: "Queime um incenso no quarto atual para impedir que o Yama troque de sala favorita pelos próximos 2 minutos."
    },
    {
        id: "yurei",
        name: "Yurei",
        evidences: ["temp", "uv", "box"],
        tags: ["standard"],
        huntThreshold: 50,
        behavior: "Consome passivamente a sanidade mental de todos na casa com muito mais velocidade.",
        strength: "Reduz a sanidade de quem fica no escuro de forma drástica em segundos.",
        weakness: "Usar incenso em seu quarto o prende lá dentro por um longo período, cessando seu roaming.",
        speedDetail: "Normal (1.7 m/s) - Constante.",
        activityDetail: "Alta. Fecha portas abruptamente de uma só vez.",
        huntBehavior: "Drena sanidade mental passiva do grupo em taxas muito altas no escuro.",
        speedType: "constant",
        activityType: "high",
        sanityType: "standard",
        passive: "Bate portas duplas de uma só vez provocando drenagem instantânea de 15% de sanidade na equipe.",
        proTip: "Se uma porta fechar com força total do nada e sua sanidade despencar 15%, é a habilidade secreta do Yurei."
    },
    {
        id: "zozo",
        name: "ZoZo",
        evidences: ["emf", "uv", "box"],
        tags: ["blair-special", "aggressive"],
        huntThreshold: 80,
        behavior: "Ligado às lendas do tabuleiro Ouija. Fica enfurecido com facilidade se for encarado diretamente.",
        strength: "Sanidade de caçada altíssima (80%). Ao usar a Ouija, tem 50% de chance de avermelhar o tabuleiro e escrever ZOZO.",
        weakness: "Não acelera ao avistar o jogador, a menos que o jogador fique olhando fixamente para sua forma física.",
        speedDetail: "Média (1.6 m/s) padrão / Acelera brutalmente (+0.8 m/s) se olhado diretamente.",
        activityDetail: "Extrema. Soletra ZOZO agressivamente no tabuleiro Ouija.",
        huntBehavior: "Caça muito cedo (80%). Nunca olhe para ele para evitar que corra muito mais rápido.",
        speedType: "variable",
        activityType: "high",
        sanityType: "early",
        passive: "Soletra Z-O-Z-O no Tabuleiro Ouija e aumenta a velocidade de caçada se o caçador olhar direto para ele.",
        proTip: "Durante a caçada do ZoZo, Olhe para o CHÃO! Encarar o corpo dele faz ele correr a mais de 2.4 m/s em sua direção."
    }
];

// Evidence Metadata
const evidencesData = {
    emf: { name: "EMF Nível 5", icon: "fa-solid fa-gauge-high" },
    temp: { name: "Temperatura Negativa", icon: "fa-solid fa-temperature-arrow-down" },
    box: { name: "Spirit Box", icon: "fa-solid fa-radio" },
    orbs: { name: "Orbes de Fantasma", icon: "fa-solid fa-circle-dot" },
    uv: { name: "Ultravioleta (UV)", icon: "fa-solid fa-hand" },
    book: { name: "Escrita Fantasma", icon: "fa-solid fa-book" },
    sls: { name: "Anomalia SLS", icon: "fa-solid fa-wave-square" }
};

// Cursed Items Metadata
const cursedItemsData = {
    tarot: {
        title: "Cartas de Tarot",
        desc: "Um baralho místico com 10 cartas aleatórias. Cada carta puxada tem um efeito drástico instantâneo.",
        rules: [
            "The Sun: Restaura 100% de sanidade média.",
            "Death: Dispara uma caçada amaldiçoada imediatamente.",
            "The Fool: Prega uma peça fingindo ser outra carta antes de sumir.",
            "The Chariot: Concede proteção contra ataques temporários (exceto contra o Harrow)."
        ]
    },
    board: {
        title: "Tábua Ouija (Spirit Board)",
        desc: "Item amaldiçoado ritualístico de madeira escura com letras de A-Z, números de 0-9 e uma planchette magnética. Permite comunicação direta em tempo real com a entidade em troca do consumo da sanidade mental do investigador.",
        rules: [
            "<strong>📍 Localização do Fantasma ('Where are you?' / 'Quarto favorito?'):</strong> Drena 40% de Sanidade. A planchette soletra o nome exato do cômodo favorito (ex: B-A-T-H-R-O-O-M, K-I-T-C-H-E-N).",
            "<strong>🎂 Idade do Fantasma ('How old are you?' / 'Idade?'):</strong> Drena 5% de Sanidade. Soletra a idade do fantasma em anos (ex: 2-4, 1-0-8).",
            "<strong>👻 Estado Emocional ('Are you lonely?' / 'Você é solitário?'):</strong> Drena 5% de Sanidade. Responde 'YES' ou 'NO'.",
            "<strong>⚠️ PERGUNTA FATAL ('Hide and Seek' / 'Esconde-Esconde'):</strong> Inicia uma contagem regressiva no tabuleiro (5... 4... 3... 2... 1), quebra a tábua em chamas e dispara uma Caçada Amaldiçoada imediata!",
            "<strong>🛑 REGRA DO 'GOODBYE' (OBRIGATÓRIO):</strong> Antes de largar a tábua ou se afastar mais de 5 metros, você DEVE dizer ou digitar 'GOODBYE'. Se você se afastar sem se despedir, a tábua se despedaça e uma Caçada Amaldiçoada é ativada instantaneamente!",
            "<strong>💥 Quebra por Sanidade Insuficiente:</strong> Se a sua sanidade atual for menor do que o custo da pergunta feita, a tábua quebra e inicia uma Caçada Amaldiçoada sem carência.",
            "<strong>👿 Possessão Demoníaca de Zozo:</strong> Se a entidade na partida for o Zozo, há 50% de chance da planchette ser tomada ao ligar a tábua, soletrando Z-O-Z-O repetidamente enquanto suga 20% de sanidade por segundo."
        ],
        questions: [
            { text: "Where are you? (Onde você está?)", cost: "-40% Sanidade", result: "Soletrará o nome da sala favorita (ex: B-A-T-H-R-O-O-M)." },
            { text: "How old are you? (Qual sua idade?)", cost: "-5% Sanidade", result: "Soletrará um número aleatório correspondente à idade." },
            { text: "Are you lonely? (Você é solitário?)", cost: "-5% Sanidade", result: "Responde SIM (YES) ou NÃO (NO)." },
            { text: "Hide and Seek (Esconde-esconde)", cost: "FATAL (-100%)", result: "Contagem regressiva 5..4..3..2..1 + Caçada Amaldiçoada Imediata!" },
            { text: "Goodbye (Adeus)", cost: "Gratuito (0%)", result: "Desliga a tábua com segurança e previne caçadas." }
        ]
    },
    music: {
        title: "Caixa de Música (Music Box)",
        desc: "Toca uma melodia sinistra que força o fantasma a cantar junto, denunciando sua posição exata.",
        rules: [
            "Útil para achar a sala do fantasma rapidamente pelo áudio.",
            "Se você se aproximar muito do fantasma enquanto segura a caixa ativa, ele inicia uma caçada amaldiçoada.",
            "Se você jogar a caixa no chão enquanto ela estiver tocando, a caçada amaldiçoada começa instantaneamente."
        ]
    },
    circle: {
        title: "Círculo de Invocação",
        desc: "Um pentagrama vermelho desenhado no chão. Acender todas as 5 velas materializa o fantasma.",
        rules: [
            "Cada vela acesa custa 16% de sanidade de quem a acender.",
            "O fantasma ficará paralisado no centro por 5 segundos, permitindo tirar fotos seguras.",
            "Após os 5 segundos, uma caçada amaldiçoada começa diretamente a partir do círculo."
        ]
    }
};

// Tarot Cards Deck definitions
const tarotCards = [
    { title: "THE SUN", icon: "fa-solid fa-sun", desc: "Restaura sua sanidade média para 100% instantaneamente.", type: "sun" },
    { title: "DEATH", icon: "fa-solid fa-skull", desc: "Inicia uma Caçada Amaldiçoada imediata.", type: "death" },
    { title: "THE FOOL", icon: "fa-solid fa-mask", desc: "Finge ser O Sol ou Morte, mas depois se transforma em O Louco sem efeitos.", type: "fool" },
    { title: "THE CHARIOT", icon: "fa-solid fa-shield-halved", desc: "Garante proteção temporária contra o fantasma.", type: "chariot" },
    { title: "THE SUN", icon: "fa-solid fa-sun", desc: "Restaura sua sanidade média para 100% instantaneamente.", type: "sun" },
    { title: "DEATH", icon: "fa-solid fa-skull", desc: "Inicia uma Caçada Amaldiçoada imediata.", type: "death" },
    { title: "THE FOOL", icon: "fa-solid fa-mask", desc: "Revela ser O Louco, nenhum efeito concedido.", type: "fool" },
    { title: "THE CHARIOT", icon: "fa-solid fa-shield-halved", desc: "Garante proteção temporária contra o fantasma.", type: "chariot" },
    { title: "THE SUN", icon: "fa-solid fa-sun", desc: "Restaura sua sanidade média para 100% instantaneamente.", type: "sun" },
    { title: "THE FOOL", icon: "fa-solid fa-mask", desc: "Finge ser morte mas vira o Louco.", type: "fool" }
];

// Tarot Wiki Detailed Data (12 cards)
const tarotWikiData = [
    {
        name: "Wheel of Fortune",
        chance: "20%",
        type: "neutral",
        desc: "Tem 50% de chance de ser Verde ou Vermelha. Se for Verde, você ganha 25% de sanidade. Se for Vermelha, você perde 25% de sanidade.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/0/02/Halo_wheel_green.webp/revision/latest/scale-to-width-down/156?cb=20251204022440"
    },
    {
        name: "The Tower",
        chance: "20%",
        type: "neutral",
        desc: "Força o fantasma a fazer uma interação imediata no ambiente (jogar um item, abrir ou fechar uma porta ou armário).",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/a/a5/The_Tower_Card.png/revision/latest/scale-to-width-down/156?cb=20241106154144"
    },
    {
        name: "The Fool",
        chance: "17%",
        type: "neutral",
        desc: "Finge ser outra carta (ex: O Sol ou Morte) antes de revelar sua verdadeira forma e tocar uma risada sarcástica. Não possui efeito real. Tem 100% de chance de aparecer se você estiver do lado de fora ou se o fantasma estiver caçando.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/8/81/The_Fool.png/revision/latest/scale-to-width-down/156?cb=20241106153414"
    },
    {
        name: "The Chariot",
        chance: "10%",
        type: "neutral",
        desc: "Força o fantasma a ir imediatamente para o quarto onde a carta foi puxada, mantendo-o preso lá por algum tempo. Não altera o quarto favorito do fantasma.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/8/8c/The_chariot_%28colored%29.png/revision/latest/scale-to-width-down/156?cb=20250130213433"
    },
    {
        name: "The Hermit",
        chance: "10%",
        type: "buff",
        desc: "Prende o fantasma em seu quarto favorito atual por exatamente 1 minuto, impedindo-o de vagar pela casa.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/7/7c/TheHermitKermitlol.png/revision/latest/scale-to-width-down/156?cb=20241106154255"
    },
    {
        name: "The Monstrosity",
        chance: "10%",
        type: "neutral",
        desc: "Força o fantasma a realizar um evento de áudio/sussurro ou uma aparição física rápida (flash event) na sala onde ele está.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/3/38/TheMonstrost.png/revision/latest/scale-to-width-down/156?cb=20241106154519"
    },
    {
        name: "Death",
        chance: "10%",
        type: "curse",
        desc: "Inicia instantaneamente uma caçada amaldiçoada. Se você não tirar esta carta nas primeiras 9 puxadas de um deck, a 10ª carta será 100% garantida de ser a Morte.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/0/08/DeathCard.png/revision/latest/scale-to-width-down/156?cb=20241106153638"
    },
    {
        name: "The Moon",
        chance: "5%",
        type: "curse",
        desc: "Drena completamente a sanidade do jogador que a puxou para 0% de forma imediata.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/e/ee/The_Moon.png/revision/latest/scale-to-width-down/156?cb=20241106154325"
    },
    {
        name: "The Sun",
        chance: "5%",
        type: "buff",
        desc: "Restaura instantaneamente a sanidade mental de quem a puxou para 100%.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/8/8a/The_Sun.png/revision/latest/scale-to-width-down/156?cb=20241106154205"
    },
    {
        name: "The High Priestess",
        chance: "2%",
        type: "buff",
        desc: "Revive um jogador morto aleatório. Se ninguém estiver morto, a carta ficará 'em espera' e reviverá automaticamente o primeiro jogador que morrer na partida.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/9/94/TheHighPries.png/revision/latest/scale-to-width-down/156?cb=20241106154028"
    },
    {
        name: "The Trap",
        chance: "1%",
        type: "curse",
        desc: "Morte instantânea. Mata na hora o jogador que a puxar assim que o papel queimar. Não há como escapar.",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/0/05/TheTrap.png/revision/latest/scale-to-width-down/156?cb=20241106154449"
    },
    {
        name: "The Boo-Boo Doll",
        chance: "0.2%",
        type: "neutral",
        desc: "Faz surgir entre 40 e 100 bonecas Boo-Boo espalhadas pela casa. Encontrar e coletar todas elas sem morrer rende uma conquista exclusiva (emblema).",
        image: "https://static.wikia.nocookie.net/blair-roblox/images/1/1c/BooBooDollCard.png/revision/latest/scale-to-width-down/156?cb=20241106154804"
    }
];

// Tools detailed info with generated photos
const toolsData = {
    emf: {
        name: "Leitor EMF Nível 5",
        desc: "Dispositivo eletrônico usado para rastrear ondas eletromagnéticas. Quando ocorrem atividades paranormais próximas, ele emite bipes. Atividade máxima (EMF 5) confirma a evidência.",
        image: "assets/emf_reader.jpg"
    },
    temp: {
        name: "Temperatura Negativa",
        desc: "Permite medir a temperatura local. Usado para achar a sala favorita do fantasma (geralmente abaixo de 10°C). Temperaturas abaixo de 0°C (frio congelante com fumaça saindo da boca) confirmam a evidência.",
        image: "" // no photo generated
    },
    box: {
        name: "Spirit Box (Caixa de Voz)",
        desc: "Rádio modificado de varredura rápida que capta frequências paranormais. Apague as luzes do cômodo e fale no chat de voz do jogo para ver se o fantasma responde com vozes fantasmagóricas.",
        image: "assets/spirit_box.jpg"
    },
    sls: {
        name: "Anomalia SLS (Câmera Kinect)",
        desc: "Scanner de matriz que detecta silhuetas invisíveis a olho nu. Coloque-o voltado para o cômodo do fantasma e assista à tela do dispositivo: se um esqueleto de linhas (wireframe) se mexer, a evidência está confirmada.",
        image: "assets/sls_camera.jpg"
    }
};

// Ghost Models Database
const ghostModelsData = [
    { name: "Clown (Harbinger)", type: "Geral", desc: "Postura curvada, gola esfarrapada de palhaço. Emite sons guturais de gargarejo constante nas perseguições.", icon: "fa-solid fa-face-laugh-beam" },
    { name: "Martyr (Cryptic)", type: "Geral", desc: "Textura de pedra cinzenta fundida com o corpo. Segura uma vela de brilho fraco e emite canto melódico e fúnebre ao caçar.", icon: "fa-solid fa-sun-plant-wilt" },
    { name: "Ikiryo", type: "Geral", desc: "Cabelos negros longos, olhos amarelados, indumentária coberta de terra escura. Emite um cantarolar suave e agudo.", icon: "fa-solid fa-person-dress" },
    { name: "Hatsune Ryeku", type: "Evento Sazonal", desc: "Robusta, pigtails ciano com fones de ouvido. Toca a canção 'Cuz I'm Hatsune Miku' nas caçadas em vez de passos/respiração.", icon: "fa-solid fa-music" },
    { name: "Freddy Fazbear", type: "Evento Especial", desc: "Urso castanho com cartola preta e dentes humanos. Articulações mecânicas com folgas que geram locomoção bizarra.", icon: "fa-solid fa-robot" },
    { name: "Boo-Boo Doll Man", type: "Evento Especial", desc: "Corpo humanoide roxo com textura de fio de lã, botões nos olhos (vermelho e preto) e corda de enforcamento no pescoço.", icon: "fa-solid fa-bezier-curve" },
    { name: "Lamp Man", type: "Evento Especial", desc: "Silhueta amarela brilhante com um abajur aceso no lugar da cabeça. Age como uma fonte de luz móvel funcional.", icon: "fa-solid fa-lightbulb" },
    { name: "Rush", type: "Evento Especial", desc: "Face 2D cinzenta com sorriso largo de dentes brancos e órbitas vazias.", icon: "fa-solid fa-skull" },
    { name: "Evil Santa", type: "Evento Sazonal", desc: "Fato de Pai Natal escuro, rosto pálido deformado, olhos vermelhos brilhantes, presas afiadas e garras longas.", icon: "fa-solid fa-candy-cane" }
];

// All 18 Equipment & Tools Database
const allEquipmentData = [
    {
        name: "Leitor EMF Nível 5",
        type: "Equipamento Primário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-gauge-simple-high",
        desc: "Mede flutuações eletromagnéticas. Nível 2 = Interação simples, Nível 3 = Arremesso de objeto, Nível 4 = Evento de Fantasma, Nível 5 = EVIDÊNCIA CONFIRMADA.",
        curiosity: "💡 O fantasma Vuult pode sobrecarregar e explodir o leitor EMF no chão com um estalo estridente!"
    },
    {
        name: "Termômetro Digital",
        type: "Equipamento Primário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-temperature-arrow-down",
        desc: "Mede a temperatura ambiente da casa. Usado para identificar a sala favorita do fantasma (geralmente abaixo de 10°C).",
        curiosity: "💡 A temperatura só cai quando o fantasma está fisicamente DENTRO do cômodo. Temperaturas abaixo de 0°C (bafo congelante) confirmam a evidência."
    },
    {
        name: "Spirit Box (Caixa de Voz)",
        type: "Equipamento Primário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-radio",
        desc: "Rádio de varredura rápida que capta frequências paranormais. Apague as luzes da sala e faça perguntas no chat de voz.",
        curiosity: "💡 A Spirit Box exige escuro absoluto na sala. Fantasmas podem responder mesmo quando não estão caçando."
    },
    {
        name: "Câmera SLS (Kinect)",
        type: "Equipamento Primário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-camera-retro",
        desc: "Câmera de luz estruturada que projeta uma malha de laser verde. Revela a silhueta em wireframe se movendo na tela.",
        curiosity: "💡 O Wraith aparece flutuando acima do solo na SLS, e o Yama faz o esqueleto SLS perseguir investigadores fora da sala!"
    },
    {
        name: "Câmera de Vídeo (Orbes)",
        type: "Equipamento Primário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-video",
        desc: "Transmite sinal com visão noturna (Night Vision) para a tela da van ou monitor portátil para detectar Orbes de Fantasma.",
        curiosity: "💡 Orbes parecem pequenas luzes flutuantes amarelo-esverdeadas e são totalmente invisíveis a olho nu sem a visão noturna."
    },
    {
        name: "Luz UV & Glowstick",
        type: "Equipamento Primário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-lightbulb",
        desc: "Luz negra ultravioleta usada para inspecionar maçanetas de portas, interruptores de luz e janelas em busca de impressões digitais.",
        curiosity: "💡 Impressões digitais duram 120 segundos. Se o fantasma for o Wraith, ele NUNCA deixará pegadas de UV ao pisar no sal!"
    },
    {
        name: "Livro de Escrita Fantasmagórica",
        type: "Equipamento Primário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-book-skull",
        desc: "Livro antigo colocado na sala favorita. O fantasma pode desenhar símbolos, textos macabros ou rabiscos demoníacos.",
        curiosity: "💡 Se o fantasma arremessar o livro longe sem escrever nada nas páginas, a evidência de Escrita pode ser descartada!"
    },
    {
        name: "Crucifixo Ritualístico",
        type: "Equipamento Defensivo",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-cross",
        desc: "Previne que o fantasma inicie uma caçada normal se ele tentar nascer dentro do raio de proteção do item no chão.",
        curiosity: "💡 O crucifixo tem 2 cargas (queima em brasas). Protege a até 3m (5m no Demon). Não bloqueia caçadas já iniciadas ou amaldiçoadas!"
    },
    {
        name: "Smudge Sticks (Incensário)",
        type: "Equipamento Defensivo",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-fire-smoke",
        desc: "Erva incensária acesa com isqueiro. Desinfeta a sala e cega/paralisa o fantasma durante uma caçada por alguns segundos.",
        curiosity: "💡 Pacifica o fantasma por 6 segundos durante caçadas (12s no Spirit) e impede caçadas espontâneas por 90 segundos."
    },
    {
        name: "Pílulas de Sanidade",
        type: "Equipamento Utilitário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-pills",
        desc: "Frasco medicinal que restaura a sanidade mental dos investigadores imediatamente.",
        curiosity: "💡 Restaura de 20% a 40% de sanidade dependendo do nível de dificuldade escolhido para a investigação."
    },
    {
        name: "Saleiro Tático (Salt Shaker)",
        type: "Equipamento Consumível",
        tier: "3 Potes por partida",
        icon: "fa-solid fa-bottle-droplet",
        desc: "Permite colocar pilhas de sal no chão. Quando o fantasma pisa no sal, ele deixa rastros visíveis com a Luz UV.",
        curiosity: "💡 O Wraith é o único fantasma que flutua e NUNCA pisa em pilhas de sal espalhadas no chão!"
    },
    {
        name: "Velas & Isqueiro",
        type: "Equipamento Utilitário",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-candle-holder",
        desc: "Fornece fonte de luz portátil. Manter uma vela acesa reduz o consumo de sanidade mental da equipe no escuro.",
        curiosity: "💡 Fantasmas podem apagar velas como uma interação ambiental. O Onryo tem chance de caçar se apagar 3 velas!"
    },
    {
        name: "Sensor de Movimento",
        type: "Equipamento de Detecção",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-walkie-talkie",
        desc: "Dispositivo fixado em paredes que dispara uma linha infravermelha. Quando o fantasma cruza a linha, ativa luz verde e apita.",
        curiosity: "💡 Essencial para mapear rotas de roaming e comprovar a presença física de fantasmas tímidos como o Shade."
    },
    {
        name: "Sensor de Som",
        type: "Equipamento de Detecção",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-satellite-dish",
        desc: "Captadores acústicos de alta sensibilidade que cobrem zonas inteiras da casa, exibindo decibéis na van.",
        curiosity: "💡 Permite identificar passos e portas abrindo através de paredes sólidas sem precisar entrar na casa."
    },
    {
        name: "Vara de Dowsing (Dowsing Rods)",
        type: "Equipamento Místico",
        tier: "Especial",
        icon: "fa-solid fa-compass",
        desc: "Duas hastes de latão articuladas seguradas pelas mãos. As hastes giram e se cruzam quando apontam para o fantasma.",
        curiosity: "💡 As hastes cruzam com maior velocidade quanto mais perto você estiver do centro da sala favorita da entidade!"
    },
    {
        name: "Projetor DOTS (Matriz Laser)",
        type: "Equipamento de Detecção",
        tier: "Nível 1 & 2",
        icon: "fa-solid fa-grip",
        desc: "Projeta um grid de pontos laser verdes no cômodo. Fantasmas com essa evidência revelam uma silhueta translúcida correndo.",
        curiosity: "💡 A silhueta DOTS só pode ser vista com clareza através de uma câmera de vídeo ou quando o cômodo está totalmente no escuro."
    },
    {
        name: "Câmera Fotográfica",
        type: "Equipamento de Recompensa",
        tier: "3 Fotos por câmera",
        icon: "fa-solid fa-camera",
        desc: "Usada para tirar fotos de evidências (ossos, marca de passos no sal, portas abertas, interações e a própria entidade).",
        curiosity: "💡 Fotos de fantasma tiradas a menos de 5m durante um evento ou no Círculo de Invocação concedem o prêmio máximo de 3 estrelas!"
    },
    {
        name: "Chaves de Van & Cadeados",
        type: "Equipamento de Segurança",
        tier: "Padrão",
        icon: "fa-solid fa-key",
        desc: "Chaves da caminhonete tática de investigação e cadeados da porta principal do mapa.",
        curiosity: "💡 A porta principal tranca automaticamente quando uma Caçada começa e só destranca quando o fantasma finaliza o ataque."
    }
];

// Historical/Removed Ghosts Database
const historicalGhostsData = [
    { name: "Antigo Oni (Versão 1)", desc: "Conhecido como a entidade 'procuradora de atenção'. Sua agressividade aumentava conforme o número de investigadores agrupados na mesma sala favorita do fantasma. Foi removido e substituído temporariamente pelo Lament." },
    { name: "O Jinn", desc: "Velocidade de caçada extrema baseada no disjuntor. Se a energia da casa estivesse ligada, corria em velocidade máxima. A estratégia era manter o disjuntor desligado. Foi substituído pelo Harrow." },
    { name: "Antigo Phantom (Versão 1)", desc: "Drenava sanidade passiva em taxas extremamente altas. Ao tirar foto dele, ele sumia da sala e a foto impressa ficava sem a imagem dele (limpa). Foi substituído pelo Yama." }
];

// 2. State Management
let evidenceStates = {
    emf: 0,   // 0 = Neutral, 1 = Confirmed, 2 = Discarded
    temp: 0,
    box: 0,
    orbs: 0,
    uv: 0,
    book: 0,
    sls: 0
};

let activeTab = "solver";
let activeFilter = "all";
let activeEvFilters = new Set();
let activeSpeedFilters = new Set();
let activeActivityFilters = new Set();
let activeSanityFilters = new Set();
let ghostSearchQuery = "";
let currentSanity = 50;
let currentCursedItem = "tarot";
let activeTarotDeck = [...tarotCards];

// 3. DOM Elements
const elements = {
    navButtons: document.querySelectorAll(".nav-btn"),
    tabSections: document.querySelectorAll(".tab-content"),
    evidenceGrid: document.getElementById("evidence-selector-grid"),
    possibleGhostsList: document.getElementById("possible-ghosts-list"),
    possibleGhostCount: document.getElementById("possible-ghost-count"),
    recommendationText: document.getElementById("recommendation-text"),
    btnResetEvidence: document.getElementById("btn-reset-evidence"),
    
    // Grimório
    ghostsGridContainer: document.getElementById("ghosts-grid-container"),
    ghostSearchInput: document.getElementById("ghost-search-input"),
    filterBtns: document.querySelectorAll(".filter-btn"),
    
    // Sanidade
    sanitySlider: document.getElementById("sanity-slider"),
    sanityPercentage: document.getElementById("sanity-percentage"),
    riskStatusValue: document.getElementById("risk-status-value"),
    activeHuntersContainer: document.getElementById("active-hunters-container"),
    activeHuntersCount: document.getElementById("active-hunters-count"),
    sanityRiskLevel: document.getElementById("sanity-risk-level"),
    sanityDisplayContainer: document.querySelector(".sanity-display-container"),
    
    // Cursed Items
    cursedItemBtns: document.querySelectorAll(".cursed-item-btn"),
    cursedDetailsDisplay: document.getElementById("cursed-details-display"),
    tarotSimulatorPanel: document.getElementById("tarot-simulator-panel"),
    btnDrawCard: document.getElementById("btn-draw-card"),
    btnResetDeck: document.getElementById("btn-reset-deck"),
    tarotCardGraphic: document.getElementById("tarot-card-graphic"),
    tarotBackFace: document.getElementById("tarot-back-face"),
    tarotCardTitle: document.getElementById("tarot-card-title"),
    tarotCardIcon: document.getElementById("tarot-card-icon"),
    tarotCardDesc: document.getElementById("tarot-card-desc"),
    cardsRemainingCount: document.getElementById("cards-remaining-count"),
    
    // Modal
    ghostModal: document.getElementById("ghost-modal"),
    closeModal: document.getElementById("close-modal"),
    ghostModalBody: document.getElementById("ghost-modal-body"),
    
    // Tarot Guide and Tool Viewer Extra Selectors
    tarotGuideGridContainer: document.getElementById("tarot-guide-grid-container"),
    toolPhotoViewer: document.getElementById("tool-photo-viewer"),
    toolPhotoImg: document.getElementById("tool-photo-img"),
    toolPhotoName: document.getElementById("tool-photo-name"),
    toolPhotoDesc: document.getElementById("tool-photo-desc"),
    evFilterBtns: document.querySelectorAll(".ev-filter-btn"),
    speedFilterBtns: document.querySelectorAll(".speed-filter-btn"),
    activityFilterBtns: document.querySelectorAll(".activity-filter-btn"),
    sanityFilterBtns: document.querySelectorAll(".sanity-filter-btn"),
    subTabBtns: document.querySelectorAll(".sub-tab-btn"),
    subTabContents: document.querySelectorAll(".sub-tab-content"),
    modelsGridContainer: document.getElementById("models-grid-container")
};

// 4. Initialization
document.addEventListener("DOMContentLoaded", () => {
    setupTacticalForum();
    setupTabNavigation();
    renderEvidenceSelector();
    updateSolver();
    renderGrimoire();
    setupSanityCalculator();
    setupCursedItems();
    setupModal();
    shuffleTarotDeck();
    setupTarotGuideTab();
    setupToolViewerEvents();
    setupSubTabs();
    renderGhostModels();
    renderAllEquipment();
    setupFaqAccordion();
    setupHuntTimer();
    setupTacticalRadio();
    fetchDiscordWidgetStatus();
});

// 5. Navigation Panel Logic
function setupTabNavigation() {
    elements.navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            elements.navButtons.forEach(b => b.classList.remove("active"));
            elements.tabSections.forEach(tab => tab.classList.remove("active"));
            
            btn.classList.add("active");
            activeTab = btn.getAttribute("data-tab");
            document.getElementById(`tab-${activeTab}`).classList.add("active");
            
            // Trigger tactical click
            AudioSynth.playClick();
            
            if (activeTab === "tarot-guide") {
                renderTarotGuide();
            }
        });
    });
}

// 6. Evidence Solver Logic (✓ Confirmado, ✗ Descartado)
function renderEvidenceSelector() {
    elements.evidenceGrid.innerHTML = "";
    Object.keys(evidencesData).forEach(key => {
        const ev = evidencesData[key];
        const state = evidenceStates[key];
        
        const row = document.createElement("div");
        row.className = `evidence-row ${state === 1 ? 'confirmed' : state === 2 ? 'discarded' : ''}`;
        row.id = `ev-row-${key}`;
        row.style.cursor = "pointer";
        
        row.innerHTML = `
            <div class="evidence-info">
                <i class="${ev.icon}"></i>
                <span class="evidence-name">${ev.name}</span>
            </div>
            <div class="evidence-states">
                <button class="state-btn state-btn-confirm ${state === 1 ? 'active' : ''}" data-state="confirm" title="Confirmar evidência (✓)">✓</button>
                <button class="state-btn state-btn-discard ${state === 2 ? 'active' : ''}" data-state="discard" title="Descartar evidência (✗)">✗</button>
            </div>
        `;
        
        // Add click events for tri-state toggles
        const confirmBtn = row.querySelector(".state-btn-confirm");
        const discardBtn = row.querySelector(".state-btn-discard");
        
        confirmBtn.addEventListener("click", () => handleEvidenceClick(key, 1));
        discardBtn.addEventListener("click", () => handleEvidenceClick(key, 2));
        
        row.addEventListener("click", (e) => {
            if (!e.target.classList.contains("state-btn")) {
                showToolPhoto(key);
                AudioSynth.playClick();
            }
        });
        
        elements.evidenceGrid.appendChild(row);
    });
}

function handleEvidenceClick(key, clickedState) {
    // If clicking an active button, set back to neutral (0)
    if (evidenceStates[key] === clickedState) {
        evidenceStates[key] = 0;
    } else {
        evidenceStates[key] = clickedState;
    }
    
    AudioSynth.playClick();
    renderEvidenceSelector();
    updateSolver();
}

elements.btnResetEvidence.addEventListener("click", () => {
    Object.keys(evidenceStates).forEach(k => evidenceStates[k] = 0);
    AudioSynth.playClick();
    renderEvidenceSelector();
    updateSolver();
});

function updateSolver() {
    const confirmedEvs = Object.keys(evidenceStates).filter(k => evidenceStates[k] === 1);
    const discardedEvs = Object.keys(evidenceStates).filter(k => evidenceStates[k] === 2);
    
    // Filter ghosts based on selected states
    const possibleGhosts = ghostsData.filter(ghost => {
        // Must contain all confirmed evidence
        const hasAllConfirmed = confirmedEvs.every(ev => ghost.evidences.includes(ev));
        // Must not contain any discarded evidence
        const hasNoDiscarded = discardedEvs.every(ev => !ghost.evidences.includes(ev));
        
        return hasAllConfirmed && hasNoDiscarded;
    });
    
    // Render list
    elements.possibleGhostCount.textContent = possibleGhosts.length;
    elements.possibleGhostsList.innerHTML = "";
    
    if (possibleGhosts.length === 0) {
        elements.possibleGhostsList.innerHTML = `
            <div class="recommendations-box" style="background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2); text-align: center; padding: 2rem;">
                <i class="fa-solid fa-circle-xmark" style="color: var(--accent-red); font-size: 2rem; margin-bottom: 1rem;"></i>
                <h4 style="color: var(--accent-red);">Sem Fantasmas Possíveis</h4>
                <p>Nenhuma combinação de fantasmas suporta as evidências selecionadas. Revise seus testes de campo.</p>
            </div>
        `;
        elements.recommendationText.textContent = "Verifique se alguma prova foi erroneamente descartada ou confirmada.";
        return;
    }
    
    possibleGhosts.forEach(ghost => {
        const row = document.createElement("div");
        row.className = "ghost-solver-row";
        
        // Build evidence bubble tags
        let bubblesHTML = "";
        ghost.evidences.forEach(evKey => {
            const ev = evidencesData[evKey];
            let bubbleClass = "potential";
            if (evidenceStates[evKey] === 1) bubbleClass = "confirmed";
            if (evidenceStates[evKey] === 2) bubbleClass = "discarded";
            
            bubblesHTML += `<span class="ev-bubble ${bubbleClass}">${ev.name}</span>`;
        });
        
        row.innerHTML = `
            <div class="ghost-solver-info">
                <h4>${ghost.name}</h4>
                <span>Limiar de Caçada: ${ghost.huntThreshold}%</span>
            </div>
            <div class="ghost-solver-evidences">
                ${bubblesHTML}
            </div>
        `;
        
        row.addEventListener("click", () => openGhostDetails(ghost.id));
        elements.possibleGhostsList.appendChild(row);
    });
    
    // Intelligent Recommendations Algorithm
    calculateRecommendations(possibleGhosts, confirmedEvs);

    // Auto-sync to Discord if checkbox is checked
    const autoSyncChk = document.getElementById("chk-auto-discord-sync");
    if (autoSyncChk && autoSyncChk.checked) {
        const reportText = generateTacticalSolverReport();
        if (window.transmitMessage) {
            window.transmitMessage(reportText);
        }
    }
}

function generateTacticalSolverReport() {
    const confirmedEvs = Object.keys(evidenceStates).filter(k => evidenceStates[k] === 1).map(k => evidencesData[k].name);
    const discardedEvs = Object.keys(evidenceStates).filter(k => evidenceStates[k] === 2).map(k => evidencesData[k].name);
    
    const confirmedEvsKeys = Object.keys(evidenceStates).filter(k => evidenceStates[k] === 1);
    const discardedEvsKeys = Object.keys(evidenceStates).filter(k => evidenceStates[k] === 2);
    
    const possibleGhosts = ghostsData.filter(ghost => {
        return confirmedEvsKeys.every(ev => ghost.evidences.includes(ev)) &&
               discardedEvsKeys.every(ev => !ghost.evidences.includes(ev));
    });

    let msg = `🕵️ **RELATÓRIO DE EVIDÊNCIAS - BLAIR HUD**\n`;
    msg += `-----------------------------------------\n`;
    msg += `✓ **Confirmadas (${confirmedEvs.length}):** ${confirmedEvs.length > 0 ? confirmedEvs.join(", ") : "Nenhuma"}\n`;
    msg += `✗ **Descartadas (${discardedEvs.length}):** ${discardedEvs.length > 0 ? discardedEvs.join(", ") : "Nenhuma"}\n`;
    
    if (possibleGhosts.length === 1) {
        msg += `🎯 **FANTASMA IDENTIFICADO:** **${possibleGhosts[0].name.toUpperCase()}**!\n`;
        msg += `⚡ Limiar de Caçada: ${possibleGhosts[0].huntThreshold}% | Velocidade: ${possibleGhosts[0].speedDetail}\n`;
        msg += `💡 Dica Pro: ${possibleGhosts[0].proTip}`;
    } else if (possibleGhosts.length === 0) {
        msg += `⚠️ **SEM FANTASMAS POSSÍVEIS!** Revise suas evidências.`;
    } else {
        const ghostNames = possibleGhosts.map(g => g.name).join(", ");
        msg += `👻 **Fantasmas Compatíveis (${possibleGhosts.length}):** ${ghostNames}`;
    }
    
    return msg;
}

// Bind Diário Discord Broadcast Button
document.addEventListener("DOMContentLoaded", () => {
    const broadcastSolverBtn = document.getElementById("btn-broadcast-solver-discord");
    if (broadcastSolverBtn) {
        broadcastSolverBtn.addEventListener("click", () => {
            const reportText = generateTacticalSolverReport();
            if (window.transmitMessage) {
                window.transmitMessage(reportText);
            }
        });
    }
});

function calculateRecommendations(possibleGhosts, confirmedEvs) {
    if (possibleGhosts.length === 21) {
        elements.recommendationText.textContent = "Comece procurando pela sala do fantasma usando o termômetro para registrar temperaturas frias e espalhe câmeras de vídeo.";
        return;
    }
    if (possibleGhosts.length === 1) {
        elements.recommendationText.innerHTML = `<strong>Fantasma Identificado: ${possibleGhosts[0].name}!</strong><br>Peculiaridade: ${possibleGhosts[0].behavior}<br>Prepare seus Smudge Sticks e crucifixos e finalize o diário.`;
        return;
    }
    
    // Find evidences that are NOT yet confirmed but are required by possible ghosts
    const allEvsCount = {};
    possibleGhosts.forEach(g => {
        g.evidences.forEach(ev => {
            if (evidenceStates[ev] === 0) { // only count neutral (unknown) evidence
                allEvsCount[ev] = (allEvsCount[ev] || 0) + 1;
            }
        });
    });
    
    // Sort evidences by frequency in remaining ghosts to suggest the most deciding tests
    const sortedSuggestions = Object.keys(allEvsCount).sort((a, b) => {
        // We want the evidence that splits the group closest to 50%
        const splitDiffA = Math.abs((possibleGhosts.length / 2) - allEvsCount[a]);
        const splitDiffB = Math.abs((possibleGhosts.length / 2) - allEvsCount[b]);
        return splitDiffA - splitDiffB;
    });
    
    if (sortedSuggestions.length > 0) {
        const topEvKey = sortedSuggestions[0];
        const topEv = evidencesData[topEvKey];
        elements.recommendationText.innerHTML = `Para estreitar a busca entre os <strong>${possibleGhosts.length} fantasmas restantes</strong>, teste preferencialmente por <strong>${topEv.name}</strong>.<br>Fantasmas que possuem essa prova: ${possibleGhosts.filter(g => g.evidences.includes(topEvKey)).map(g => g.name).join(", ")}.`;
        showToolPhoto(topEvKey);
    } else {
        elements.recommendationText.textContent = "Verifique o diário. Algo parece não bater com o número correto de evidências.";
        if (elements.toolPhotoViewer) elements.toolPhotoViewer.style.display = "none";
    }
}

// 7. Grimoire Logic (Com Suporte a Seleção Múltipla de Filtros)
function renderGrimoire() {
    elements.ghostsGridContainer.innerHTML = "";
    
    const filtered = ghostsData.filter(ghost => {
        const matchesSearch = ghost.name.toLowerCase().includes(ghostSearchQuery.toLowerCase());
        
        let matchesFilter = true;
        if (activeFilter === "aggressive") {
            matchesFilter = ghost.tags.includes("aggressive");
        } else if (activeFilter === "speed") {
            matchesFilter = ghost.tags.includes("speed");
        } else if (activeFilter === "blair-special") {
            matchesFilter = ghost.tags.includes("blair-special");
        }
        
        // Multi-evidence filtering (Must match ALL selected evidences)
        let matchesEvFilter = true;
        if (activeEvFilters.size > 0) {
            matchesEvFilter = Array.from(activeEvFilters).every(evKey => ghost.evidences.includes(evKey));
        }
        
        // Multi-speed filtering (Match ANY selected speed type)
        let matchesSpeedFilter = true;
        if (activeSpeedFilters.size > 0) {
            matchesSpeedFilter = activeSpeedFilters.has(ghost.speedType);
        }
        
        // Multi-activity filtering (Match ANY selected activity type)
        let matchesActivityFilter = true;
        if (activeActivityFilters.size > 0) {
            matchesActivityFilter = activeActivityFilters.has(ghost.activityType);
        }
        
        // Multi-sanity filtering (Match ANY selected sanity type)
        let matchesSanityFilter = true;
        if (activeSanityFilters.size > 0) {
            matchesSanityFilter = activeSanityFilters.has(ghost.sanityType);
        }
        
        return matchesSearch && matchesFilter && matchesEvFilter && matchesSpeedFilter && matchesActivityFilter && matchesSanityFilter;
    });
    
    if (filtered.length === 0) {
        elements.ghostsGridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-ghost" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Nenhum fantasma encontrado com essa combinação de filtros.</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(ghost => {
        const card = document.createElement("div");
        card.className = "card glass-card ghost-card";
        
        let tagHTML = `<span class="ghost-tag tag-standard">Padrão</span>`;
        if (ghost.tags.includes("aggressive")) {
            tagHTML = `<span class="ghost-tag tag-aggressive">Agressivo</span>`;
        } else if (ghost.tags.includes("speed")) {
            tagHTML = `<span class="ghost-tag tag-speed">Velocidade</span>`;
        } else if (ghost.tags.includes("blair-special")) {
            tagHTML = `<span class="ghost-tag tag-special">Especial Blair</span>`;
        }
        
        let evBadges = "";
        ghost.evidences.forEach(evKey => {
            const ev = evidencesData[evKey];
            evBadges += `<span class="badge badge-info" style="font-size: 0.72rem; padding: 0.25rem 0.6rem; margin-right: 0.3rem; margin-bottom: 0.3rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="${ev.icon}"></i> ${ev.name}</span>`;
        });
        
        card.innerHTML = `
            <div class="ghost-card-top">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem;">
                    <h3 style="font-family: var(--font-header); font-size: 1.3rem; font-weight: 700; color: #fff;">${ghost.name}</h3>
                    ${tagHTML}
                </div>
                <p class="ghost-card-desc" style="font-size: 0.82rem; line-height: 1.4; color: var(--text-muted); margin-bottom: 1rem;">${ghost.behavior}</p>
                
                <!-- Expanded Information Grid -->
                <div class="ghost-specs-grid" style="display: flex; flex-direction: column; gap: 0.5rem; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); margin-bottom: 1rem;">
                    <div style="font-size: 0.78rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-gauge-simple-high" style="color: var(--accent-blue); width: 16px;"></i>
                        <span><strong>Velocidade:</strong> ${ghost.speedDetail}</span>
                    </div>
                    <div style="font-size: 0.78rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-bolt" style="color: var(--accent-green); width: 16px;"></i>
                        <span><strong>Atividade:</strong> ${ghost.activityDetail}</span>
                    </div>
                    <div style="font-size: 0.78rem; color: var(--text-main); display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fa-solid fa-skull" style="color: var(--accent-red); width: 16px;"></i>
                        <span><strong>Ataque:</strong> Caça com &le; <strong style="color: var(--accent-red);">${ghost.huntThreshold}%</strong> sanidade.</span>
                    </div>
                    <div style="font-size: 0.76rem; color: #fef4b2; background: rgba(254,228,64,0.06); padding: 0.5rem 0.6rem; border-radius: 6px; border: 1px solid rgba(254,228,64,0.2); margin-top: 0.2rem;">
                        <strong>👁️ Passiva:</strong> ${ghost.passive || "Comportamento padrão."}
                    </div>
                </div>
            </div>
            <div class="ghost-card-footer" style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.8rem; display: flex; flex-wrap: wrap; gap: 0.3rem;">
                ${evBadges}
            </div>
        `;
        
        card.addEventListener("click", () => openGhostDetails(ghost.id));
        elements.ghostsGridContainer.appendChild(card);
    });
}

elements.ghostSearchInput.addEventListener("input", (e) => {
    ghostSearchQuery = e.target.value;
    renderGrimoire();
});

elements.filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        elements.filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.getAttribute("data-filter");
        renderGrimoire();
    });
});

// Generic multi-select filter helper
function setupMultiSelectFilter(buttons, activeSet, dataAttr, allValue = "all") {
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const val = btn.getAttribute(dataAttr);
            
            if (val === allValue) {
                activeSet.clear();
                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            } else {
                // Remove 'all' active state
                const allBtn = Array.from(buttons).find(b => b.getAttribute(dataAttr) === allValue);
                if (allBtn) allBtn.classList.remove("active");
                
                if (activeSet.has(val)) {
                    activeSet.delete(val);
                    btn.classList.remove("active");
                } else {
                    activeSet.add(val);
                    btn.classList.add("active");
                }
                
                // If set is empty, reactivate 'all'
                if (activeSet.size === 0 && allBtn) {
                    allBtn.classList.add("active");
                }
            }
            
            AudioSynth.playClick();
            renderGrimoire();
        });
    });
}

setupMultiSelectFilter(elements.evFilterBtns, activeEvFilters, "data-ev-filter");
setupMultiSelectFilter(elements.speedFilterBtns, activeSpeedFilters, "data-speed-filter");
setupMultiSelectFilter(elements.activityFilterBtns, activeActivityFilters, "data-activity-filter");
setupMultiSelectFilter(elements.sanityFilterBtns, activeSanityFilters, "data-sanity-filter");

// 8. Sanity Control Panel Logic
function setupSanityCalculator() {
    elements.sanitySlider.addEventListener("input", (e) => {
        currentSanity = parseInt(e.target.value);
        updateSanityDisplay();
    });
    
    updateSanityDisplay();
}

function updateSanityDisplay() {
    elements.sanityPercentage.textContent = `${currentSanity}%`;
    
    let riskStatus = "BAIXO";
    let riskColor = "var(--accent-green)";
    let borderShadow = "rgba(34, 197, 94, 0.1)";
    
    if (currentSanity <= 35) {
        riskStatus = "PERIGO EXTREMO";
        riskColor = "var(--accent-red)";
        borderShadow = "rgba(239, 68, 68, 0.2)";
    } else if (currentSanity <= 55) {
        riskStatus = "MODERADO";
        riskColor = "#ffa500";
        borderShadow = "rgba(255, 165, 0, 0.15)";
    }
    
    elements.riskStatusValue.textContent = riskStatus;
    elements.riskStatusValue.style.color = riskColor;
    elements.sanityDisplayContainer.style.borderColor = riskColor;
    elements.sanityDisplayContainer.style.boxShadow = `inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 15px ${borderShadow}`;
    
    const activeHunters = ghostsData.filter(g => currentSanity <= g.huntThreshold);
    
    elements.activeHuntersCount.textContent = activeHunters.length;
    elements.activeHuntersContainer.innerHTML = "";
    
    if (activeHunters.length === 0) {
        elements.activeHuntersContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-shield-halved" style="font-size: 2.5rem; color: var(--accent-green); margin-bottom: 1rem; opacity: 0.8;"></i>
                <p>Nenhum fantasma consegue iniciar caçadas normais neste nível de sanidade.</p>
            </div>
        `;
        return;
    }
    
    activeHunters.forEach(ghost => {
        const row = document.createElement("div");
        row.className = "hunter-row";
        
        row.innerHTML = `
            <span class="hunter-row-name">${ghost.name}</span>
            <span class="hunter-row-threshold">Ataca c/ &le; ${ghost.huntThreshold}%</span>
        `;
        
        row.style.cursor = "pointer";
        row.addEventListener("click", () => openGhostDetails(ghost.id));
        elements.activeHuntersContainer.appendChild(row);
    });
}

// 9. Cursed Objects & Tarot Sim Panel Logic
function setupCursedItems() {
    elements.cursedItemBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            elements.cursedItemBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCursedItem = btn.getAttribute("data-item");
            updateCursedDetails();
            AudioSynth.playClick();
        });
    });
    
    elements.btnDrawCard.addEventListener("click", drawTarotCard);
    elements.btnResetDeck.addEventListener("click", shuffleTarotDeck);
    
    updateCursedDetails();
}

function updateCursedDetails() {
    const item = cursedItemsData[currentCursedItem];
    if (!item) return;
    
    let rulesHTML = "";
    item.rules.forEach(rule => {
        rulesHTML += `<li>${rule}</li>`;
    });
    
    let questionsHTML = "";
    if (item.questions && item.questions.length > 0) {
        let rows = "";
        item.questions.forEach(q => {
            let badgeClass = "badge-info";
            if (q.cost.includes("FATAL")) badgeClass = "badge-danger";
            else if (q.cost.includes("-40%")) badgeClass = "badge-warning";
            else if (q.cost.includes("Gratuito")) badgeClass = "badge-success";

            rows += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                    <td style="padding: 0.6rem; color: #fff; font-weight: 600; font-size: 0.8rem;">${q.text}</td>
                    <td style="padding: 0.6rem;"><span class="badge ${badgeClass}" style="font-size: 0.72rem;">${q.cost}</span></td>
                    <td style="padding: 0.6rem; color: var(--text-muted); font-size: 0.78rem; line-height: 1.3;">${q.result}</td>
                </tr>
            `;
        });

        questionsHTML = `
            <div style="margin-top: 1.2rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem; overflow-x: auto;">
                <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 0.8rem; font-family: var(--font-header); display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-list-check"></i> Guia Técnico de Perguntas & Custos de Sanidade
                </h4>
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase;">
                            <th style="padding: 0.5rem;">Pergunta Realizada</th>
                            <th style="padding: 0.5rem;">Custo de Sanidade</th>
                            <th style="padding: 0.5rem;">Resultado & Reação da Planchette</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    elements.cursedDetailsDisplay.innerHTML = `
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
        <ul>${rulesHTML}</ul>
        ${questionsHTML}
    `;
    
    if (currentCursedItem === "tarot") {
        elements.tarotSimulatorPanel.style.display = "block";
    } else {
        elements.tarotSimulatorPanel.style.display = "none";
    }
}

function drawTarotCard() {
    if (activeTarotDeck.length === 0) {
        elements.tarotCardDesc.textContent = "O baralho acabou! Clique em Reorganizar para embaralhar novamente.";
        AudioSynth.playClick();
        return;
    }
    
    elements.tarotCardGraphic.classList.remove("flipped");
    AudioSynth.playMysticDraw(); // Shimmer & Swoosh
    
    setTimeout(() => {
        const cardIndex = Math.floor(Math.random() * activeTarotDeck.length);
        const card = activeTarotDeck.splice(cardIndex, 1)[0];
        
        elements.cardsRemainingCount.textContent = `Cartas Restantes: ${activeTarotDeck.length}/10`;
        
        elements.tarotBackFace.className = "tarot-face tarot-back";
        elements.tarotBackFace.classList.add(`card-${card.type}`);
        
        elements.tarotCardTitle.textContent = card.title;
        elements.tarotCardIcon.className = card.icon;
        elements.tarotCardDesc.textContent = card.desc;
        
        elements.tarotCardGraphic.classList.add("flipped");
    }, 150);
}

function shuffleTarotDeck() {
    activeTarotDeck = [...tarotCards];
    elements.cardsRemainingCount.textContent = "Cartas Restantes: 10/10";
    elements.tarotCardGraphic.classList.remove("flipped");
    AudioSynth.playClick();
    
    elements.tarotCardTitle.textContent = "COMPRAR CARTA";
    elements.tarotCardIcon.className = "fa-solid fa-ghost";
    elements.tarotCardDesc.textContent = "Clique para puxar uma nova carta.";
}

// 10. Modal Logic for Ghost Details
function setupModal() {
    elements.closeModal.addEventListener("click", () => {
        elements.ghostModal.classList.remove("active");
    });
    
    window.addEventListener("click", (e) => {
        if (e.target === elements.ghostModal) {
            elements.ghostModal.classList.remove("active");
        }
    });
}

function openGhostDetails(ghostId) {
    const ghost = ghostsData.find(g => g.id === ghostId);
    if (!ghost) return;
    
    let evBadges = "";
    ghost.evidences.forEach(evKey => {
        const ev = evidencesData[evKey];
        evBadges += `<span class="badge badge-info" style="font-size: 0.85rem; padding: 0.4rem 0.8rem; border-color: rgba(0,240,255,0.4); background: rgba(0,240,255,0.1); color: #fff; font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;"><i class="${ev.icon}"></i> ${ev.name}</span>`;
    });
    
    elements.ghostModalBody.innerHTML = `
        <div class="modal-ghost-header" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1.2rem; margin-bottom: 1.2rem; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
            <div>
                <h2 style="font-family: var(--font-header); font-size: 1.8rem; margin: 0 0 0.6rem 0; color: #fff; font-weight: 800;">${ghost.name}</h2>
                <div class="modal-evidence-badges" style="display: flex; gap: 0.4rem; flex-wrap: wrap;">${evBadges}</div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem;">
                <span class="badge danger-badge" style="font-size: 0.95rem; padding: 0.5rem 1.2rem; font-weight: 700;">⚡ Ataque &le; ${ghost.huntThreshold}% Sanidade</span>
            </div>
        </div>
        
        <!-- Expert Information Box -->
        <div style="background: linear-gradient(135deg, rgba(188,71,255,0.15) 0%, rgba(0,240,255,0.1) 100%); border: 1.5px solid rgba(188,71,255,0.4); padding: 1.2rem; border-radius: 14px; margin-bottom: 1.4rem; display: flex; flex-direction: column; gap: 0.8rem;">
            <h4 style="color: var(--primary); font-family: var(--font-header); font-size: 1.05rem; margin: 0; display: flex; align-items: center; gap: 0.6rem;">
                <i class="fa-solid fa-user-ninja" style="color: var(--accent-blue);"></i> Análise de Especialista (Dicas & Passivas de Elite)
            </h4>
            <div style="font-size: 0.88rem; color: #fff; line-height: 1.5;">
                <strong style="color: var(--accent-yellow);">👁️ Habilidade Oculta / Passiva:</strong> ${ghost.passive || "Comportamento padrão."}
            </div>
            <div style="font-size: 0.88rem; color: #fff; line-height: 1.5;">
                <strong style="color: var(--accent-green);">💡 Dica Pro de Campo:</strong> ${ghost.proTip || "Mantenha crucifixos por perto."}
            </div>
        </div>

        <div class="modal-section" style="margin-bottom: 1.2rem;">
            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 0.4rem; font-family: var(--font-header);"><i class="fa-solid fa-circle-info"></i> Comportamento Geral</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${ghost.behavior}</p>
        </div>
        
        <div class="modal-section" style="margin-bottom: 1.2rem;">
            <h4 style="color: var(--accent-blue); font-size: 0.95rem; margin-bottom: 0.4rem; font-family: var(--font-header);"><i class="fa-solid fa-gauge-simple-high" style="color: var(--accent-blue);"></i> Velocidade de Caçada Detalhada</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${ghost.speedDetail}</p>
        </div>
        
        <div class="modal-section" style="margin-bottom: 1.2rem;">
            <h4 style="color: var(--accent-green); font-size: 0.95rem; margin-bottom: 0.4rem; font-family: var(--font-header);"><i class="fa-solid fa-bolt" style="color: var(--accent-green);"></i> Atividade & Frequência no Quarto</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${ghost.activityDetail}</p>
        </div>
        
        <div class="modal-section" style="margin-bottom: 1.2rem;">
            <h4 style="color: var(--accent-red); font-size: 0.95rem; margin-bottom: 0.4rem; font-family: var(--font-header);"><i class="fa-solid fa-bullseye" style="color: var(--accent-red);"></i> Tática de Caçada & Sobrevivência</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${ghost.huntBehavior}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1.2rem;">
            <div class="modal-section" style="background: rgba(188,71,255,0.08); padding: 1rem; border-radius: 12px; border: 1px solid rgba(188,71,255,0.3);">
                <h4 style="color: var(--primary); font-size: 0.9rem; margin-bottom: 0.3rem; font-family: var(--font-header);"><i class="fa-solid fa-circle-plus"></i> Ponto Forte</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin: 0;">${ghost.strength}</p>
            </div>
            
            <div class="modal-section" style="background: rgba(57,255,20,0.08); padding: 1rem; border-radius: 12px; border: 1px solid rgba(57,255,20,0.3);">
                <h4 style="color: var(--accent-green); font-size: 0.9rem; margin-bottom: 0.3rem; font-family: var(--font-header);"><i class="fa-solid fa-shield-virus"></i> Ponto Fraco</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin: 0;">${ghost.weakness}</p>
            </div>
        </div>
    `;
    
    elements.ghostModal.classList.add("active");
}

// 11. Tarot Guide Tab Setup & Render
function setupTarotGuideTab() {
    // Dinamicamente manipulado na navegação de abas
}

function renderTarotGuide() {
    if (!elements.tarotGuideGridContainer) return;
    elements.tarotGuideGridContainer.innerHTML = "";
    
    tarotWikiData.forEach(card => {
        const cardDiv = document.createElement("div");
        
        let borderClass = "border-neutral";
        if (card.type === "buff") borderClass = "border-buff";
        if (card.type === "curse") borderClass = "border-curse";
        
        cardDiv.className = `tarot-guide-card ${borderClass}`;
        
        cardDiv.innerHTML = `
            <div class="tarot-guide-card-img-container">
                <img src="${card.image}" alt="Carta ${card.name}">
            </div>
            <div class="tarot-guide-card-info">
                <h3>${card.name}</h3>
                <span class="tarot-guide-card-chance">Probabilidade: ${card.chance}</span>
                <p class="tarot-guide-card-desc">${card.desc}</p>
            </div>
        `;
        
        elements.tarotGuideGridContainer.appendChild(cardDiv);
    });
}

// 12. Tool Photo Viewer Logic
function setupToolViewerEvents() {
    // Os ouvintes de cliques são vinculados dinamicamente no renderEvidenceSelector()
}

function showToolPhoto(key) {
    const tool = toolsData[key];
    if (!tool || !elements.toolPhotoViewer) {
        if (elements.toolPhotoViewer) elements.toolPhotoViewer.style.display = "none";
        return;
    }
    
    elements.toolPhotoName.textContent = tool.name;
    elements.toolPhotoDesc.textContent = tool.desc;
    
    if (tool.image) {
        elements.toolPhotoImg.src = tool.image;
        elements.toolPhotoImg.style.display = "block";
    } else {
        // Fallback para itens sem foto física (como temperatura)
        elements.toolPhotoImg.style.display = "none";
    }
    
    elements.toolPhotoViewer.style.display = "block";
}

// 13. Sub-tabs Logic for Cursed & Models Tab
function setupSubTabs() {
    elements.subTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            elements.subTabBtns.forEach(b => b.classList.remove("active"));
            elements.subTabContents.forEach(c => c.style.display = "none");
            
            btn.classList.add("active");
            const targetSub = btn.getAttribute("data-sub-tab");
            document.getElementById(`sub-tab-${targetSub}`).style.display = "block";
        });
    });
}

function renderGhostModels() {
    if (!elements.modelsGridContainer) return;
    elements.modelsGridContainer.innerHTML = "";
    
    // Render current active seasonal models
    ghostModelsData.forEach(model => {
        const card = document.createElement("div");
        card.className = "card glass-card";
        card.style.padding = "1.2rem";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.gap = "0.6rem";
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-family: var(--font-header); font-size: 1rem; color: #fff; font-weight: 700;">
                    <i class="${model.icon}" style="color: var(--accent-blue); margin-right: 0.4rem;"></i>
                    ${model.name}
                </h4>
                <span class="badge" style="font-size: 0.7rem; padding: 0.2rem 0.6rem; border-color: rgba(255,255,255,0.1); color: var(--text-muted);">
                    ${model.type}
                </span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">${model.desc}</p>
        `;
        elements.modelsGridContainer.appendChild(card);
    });

    // Append a section for Historical/Removed Ghosts inside the models container
    const histHeader = document.createElement("div");
    histHeader.style.gridColumn = "1 / -1";
    histHeader.style.marginTop = "2rem";
    histHeader.style.borderTop = "1px solid rgba(255,255,255,0.05)";
    histHeader.style.paddingTop = "1.5rem";
    histHeader.innerHTML = `
        <h3 style="color: #ffa500; font-family: var(--font-header); font-size: 1.15rem; margin-bottom: 0.5rem;">
            <i class="fa-solid fa-clock-rotate-left"></i> Registro Histórico: Entidades Descontinuadas
        </h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
            Fantasmas do passado que foram arquivados ou substituídos por razões de balanceamento operacional:
        </p>
    `;
    elements.modelsGridContainer.appendChild(histHeader);

    historicalGhostsData.forEach(hist => {
        const card = document.createElement("div");
        card.className = "card glass-card";
        card.style.padding = "1.2rem";
        card.style.border = "1px solid rgba(255, 165, 0, 0.15)";
        
        card.innerHTML = `
            <h4 style="font-family: var(--font-header); font-size: 1rem; color: #ffa500; font-weight: 700; margin-bottom: 0.4rem;">
                <i class="fa-solid fa-skull-crossbones" style="margin-right: 0.4rem;"></i>
                ${hist.name}
            </h4>
            <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.4;">${hist.desc}</p>
        `;
        elements.modelsGridContainer.appendChild(card);
    });
}

function renderAllEquipment() {
    const container = document.getElementById("equipment-grid-container");
    if (!container) return;
    container.innerHTML = "";

    allEquipmentData.forEach(item => {
        const card = document.createElement("div");
        card.className = "card glass-card";
        card.style.cssText = "padding: 1.2rem; display: flex; flex-direction: column; gap: 0.7rem; border-color: rgba(0,240,255,0.25); border-radius: 16px;";

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-family: var(--font-header); font-size: 1rem; color: #fff; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; margin: 0;">
                    <i class="${item.icon}" style="color: var(--accent-blue);"></i>
                    ${item.name}
                </h4>
                <span class="badge badge-info" style="font-size: 0.7rem; padding: 0.2rem 0.6rem;">
                    ${item.tier}
                </span>
            </div>
            <span style="font-size: 0.72rem; color: var(--accent-green); font-weight: 600;">${item.type}</span>
            <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; margin: 0;">${item.desc}</p>
            <div style="background: rgba(254, 228, 64, 0.06); border: 1px solid rgba(254, 228, 64, 0.25); padding: 0.65rem 0.8rem; border-radius: 10px; font-size: 0.76rem; color: #fef4b2; margin-top: 0.3rem; line-height: 1.4;">
                ${item.curiosity}
            </div>
        `;
        container.appendChild(card);
    });
}

// 14. Sound & Suspense Audio Synthesizer (Web Audio API)
const AudioSynth = {
    ctx: null,
    droneNode: null,
    oscL: null,
    oscR: null,
    gainNode: null,
    isActive: false,

    init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
    },

    toggle() {
        this.init();
        if (this.ctx.state === "suspended") {
            this.ctx.resume();
        }

        if (this.isActive) {
            this.stopDrone();
            this.isActive = false;
            document.getElementById("audio-icon").className = "fa-solid fa-volume-xmark";
            document.getElementById("btn-toggle-audio").style.borderColor = "var(--border-color)";
            document.getElementById("btn-toggle-audio").style.color = "var(--text-muted)";
        } else {
            this.startDrone();
            this.isActive = true;
            document.getElementById("audio-icon").className = "fa-solid fa-volume-high";
            document.getElementById("btn-toggle-audio").style.borderColor = "var(--primary)";
            document.getElementById("btn-toggle-audio").style.color = "var(--primary)";
            this.playClick();
        }
    },

    startDrone() {
        if (!this.ctx) return;
        
        // Master gain
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3); // fade in drone over 3s
        this.gainNode.connect(this.ctx.destination);

        // Low frequency beating drone (Left ear)
        this.oscL = this.ctx.createOscillator();
        this.oscL.type = "sine";
        this.oscL.frequency.setValueAtTime(45, this.ctx.currentTime); // very low bass
        
        // Low frequency beating drone (Right ear)
        this.oscR = this.ctx.createOscillator();
        this.oscR.type = "triangle";
        this.oscR.frequency.setValueAtTime(45.6, this.ctx.currentTime); // slightly off frequency for binaural beating!
        
        // Lowpass filter to make it warmer/darker
        const lpFilter = this.ctx.createBiquadFilter();
        lpFilter.type = "lowpass";
        lpFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

        this.oscL.connect(lpFilter);
        this.oscR.connect(lpFilter);
        lpFilter.connect(this.gainNode);

        this.oscL.start();
        this.oscR.start();
    },

    stopDrone() {
        if (this.gainNode) {
            try {
                this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5); // fast fade out
                setTimeout(() => {
                    if (this.oscL) this.oscL.stop();
                    if (this.oscR) this.oscR.stop();
                }, 500);
            } catch (e) {
                console.error(e);
            }
        }
    },

    playClick() {
        if (!this.ctx || !this.isActive) return;
        
        // Synth a satisfying tactical mechanical click
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        
        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(1000, this.ctx.currentTime);
        clickOsc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.08); // fast pitch drop
        
        clickGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08); // fast volume decay
        
        clickOsc.connect(clickGain);
        clickGain.connect(this.ctx.destination);
        
        clickOsc.start();
        clickOsc.stop(this.ctx.currentTime + 0.08);
    },

    playMysticDraw() {
        if (!this.ctx || !this.isActive) return;

        // Synth a magical sweeps and wind sound for Tarot draw
        const now = this.ctx.currentTime;
        
        // High frequency shimmering bell
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.5); // sweeping up frequency
        osc.frequency.linearRampToValueAtTime(150, now + 1.2); // then dropping back down
        
        filter.type = "bandpass";
        filter.Q.setValueAtTime(5, now);
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(2500, now + 0.8);
        
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.2); // fade in
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5); // slow decay
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(now + 1.5);
        
        // Low pitch swoosh
        const swooshOsc = this.ctx.createOscillator();
        const swooshGain = this.ctx.createGain();
        
        swooshOsc.type = "triangle";
        swooshOsc.frequency.setValueAtTime(80, now);
        swooshOsc.frequency.exponentialRampToValueAtTime(300, now + 0.6);
        
        swooshGain.gain.setValueAtTime(0.25, now);
        swooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        
        swooshOsc.connect(swooshGain);
        swooshGain.connect(this.ctx.destination);
        
        swooshOsc.start();
        swooshOsc.stop(now + 0.6);
    }
};

// Listen to Audio Toggle
document.addEventListener("DOMContentLoaded", () => {
    const audioBtn = document.getElementById("btn-toggle-audio");
    const mobileAudioBtn = document.getElementById("btn-toggle-audio-mobile");

    if (audioBtn) {
        audioBtn.addEventListener("click", () => AudioSynth.toggle());
    }
    if (mobileAudioBtn) {
        mobileAudioBtn.addEventListener("click", () => AudioSynth.toggle());
    }
});

// 15. Tactical Chat Forum (Discord Webhook Transmitter & Alert System)
function setupTacticalForum() {
    const customWebhookInput = document.getElementById("custom-webhook-input");
    const saveWebhookBtn = document.getElementById("btn-save-webhook");
    const tacticalTerminal = document.getElementById("tactical-log-terminal");

    if (customWebhookInput) {
        const savedUrl = localStorage.getItem("blair_custom_webhook") || "";
        customWebhookInput.value = savedUrl;
    }

    if (saveWebhookBtn && customWebhookInput) {
        saveWebhookBtn.addEventListener("click", () => {
            const url = customWebhookInput.value.trim();
            localStorage.setItem("blair_custom_webhook", url);
            if (url) {
                showGlobalToast("✅ Webhook do Discord salvo no seu navegador!");
            } else {
                showGlobalToast("ℹ️ Webhook removido. Usando modo de console local.");
            }
            AudioSynth.playClick();
        });
    }

    function appendTerminalLog(msgText, isWebhook = false) {
        if (!tacticalTerminal) return;
        const timeStr = new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const logLine = document.createElement("div");
        logLine.style.cssText = "padding: 0.3rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); word-break: break-word;";
        
        let prefix = `<span style="color: var(--accent-blue);">[${timeStr}] 📻 LOCAL:</span> `;
        if (isWebhook) {
            prefix = `<span style="color: var(--accent-green);">[${timeStr}] 🌐 DISCORD:</span> `;
        }
        
        logLine.innerHTML = `${prefix} ${msgText}`;
        tacticalTerminal.appendChild(logLine);
        tacticalTerminal.scrollTop = tacticalTerminal.scrollHeight;
    }

    function transmitMessage(content) {
        if (!content) return;
        
        const customWebhookUrl = localStorage.getItem("blair_custom_webhook") || (customWebhookInput ? customWebhookInput.value.trim() : "");
        const nickname = localStorage.getItem("blair_discord_nick") || "Investigador";

        appendTerminalLog(content, !!customWebhookUrl);

        if (customWebhookUrl && customWebhookUrl.startsWith("http")) {
            const standardPayload = {
                username: `${nickname} (Blair HUD)`,
                content: content
            };

            // Send to user's custom Webhook
            fetch(customWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(standardPayload)
            }).then(res => {
                if (res.ok || res.status === 204) {
                    showGlobalToast("✅ Transmitido para o seu Webhook do Discord!");
                } else {
                    showGlobalToast("⚠️ Erro no Webhook (HTTP " + res.status + ")", true);
                }
            }).catch(err => {
                console.error("Erro no Webhook:", err);
                showGlobalToast("⚠️ Falha de conexão com Webhook.", true);
            });
        } else {
            showGlobalToast("📋 Transmissão registrada no Console Tático!");
        }

        AudioSynth.playClick();
    }

    // Expose transmitMessage globally for Diário Solver
    window.transmitMessage = transmitMessage;

    function showStatus(text) {
        if (!sendStatus) return;
        sendStatus.textContent = text;
        sendStatus.style.opacity = "1";
        setTimeout(() => {
            sendStatus.style.opacity = "0";
        }, 3000);
    }

    if (sendBtn && msgInput) {
        sendBtn.addEventListener("click", () => {
            const text = msgInput.value.trim();
            if (text) {
                transmitMessage(text);
                msgInput.value = "";
            }
        });

        msgInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const text = msgInput.value.trim();
                if (text) {
                    transmitMessage(text);
                    msgInput.value = "";
                }
            }
        });
    }

    // Clipboard & Quick Alert Buttons
    const copyBtns = document.querySelectorAll(".copy-alert-btn");
    const reportBtn = document.getElementById("btn-copy-solver-report");

    copyBtns.forEach(btn => {
        if (btn.id === "btn-copy-solver-report") return;
        btn.addEventListener("click", () => {
            const text = btn.getAttribute("data-text");
            transmitMessage(text);
        });
    });

    // Copy GIFs Logic
    const gifBtns = document.querySelectorAll(".copy-gif-btn");
    gifBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const url = btn.getAttribute("data-url");
            copyToClipboard(url);
        });
    });

    // Voice TTS (Speech Synthesis) & Direct Discord Transmission
    const ttsBtns = document.querySelectorAll(".tts-btn");
    ttsBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const speakText = btn.getAttribute("data-speak");
            if (speakText) {
                // Speak out loud via browser TTS
                if ('speechSynthesis' in window) {
                    AudioSynth.playClick();
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(speakText);
                    utterance.lang = "pt-BR";
                    utterance.rate = 1.0;
                    utterance.pitch = 0.95;
                    window.speechSynthesis.speak(utterance);
                }
                // Transmit voice alert to Discord
                transmitMessage(`📢 **[ALERTA DE VOZ]** ${speakText}`);
            }
        });
    });

    // Copy Evidence Solver Report Button
    if (reportBtn) {
        // Build dynamic report initially
        updateSolverReportText();

        reportBtn.addEventListener("click", () => {
            updateSolverReportText();
            const text = reportBtn.getAttribute("data-text");
            copyToClipboard(text);
        });
    }

    function updateSolverReportText() {
        if (!reportBtn) return;
        const confirmedEvs = Object.keys(evidenceStates)
            .filter(k => evidenceStates[k] === 1)
            .map(k => evidencesData[k].name);
        const currentPossible = elements.possibleGhostCount ? elements.possibleGhostCount.textContent : "21";
        
        let reportText = "🕵️ RELATÓRIO BLAIR: ";
        if (confirmedEvs.length > 0) {
            reportText += `[Provas: ${confirmedEvs.join(", ")}]`;
        } else {
            reportText += "[Sem provas confirmadas ainda]";
        }
        reportText += ` | Possibilidades Restantes: ${currentPossible} fantasmas.`;
        
        reportBtn.setAttribute("data-text", reportText);
    }

    // Export report updates when updateSolver runs
    const originalUpdateSolver = window.updateSolver;
    window.updateSolver = function() {
        if (originalUpdateSolver) originalUpdateSolver();
        updateSolverReportText();
    };

    function copyToClipboard(text) {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            if (successToast) {
                successToast.style.opacity = "1";
                setTimeout(() => {
                    successToast.style.opacity = "0";
                }, 2000);
            }
            AudioSynth.playClick();
        }).catch(err => {
            console.error("Erro ao copiar para clipboard:", err);
        });
    }

    // Secondary Objectives Checklist (Auto-save in localStorage)
    const objectives = ["obj-bone", "obj-photo", "obj-crucifix", "obj-sensor", "obj-smudge"];
    objectives.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            // Load saved state
            const saved = localStorage.getItem(id);
            if (saved === "true") checkbox.checked = true;

            // Save on change
            checkbox.addEventListener("change", () => {
                localStorage.setItem(id, checkbox.checked);
                AudioSynth.playClick();
            });
        }
    });

    // Copy Discord ID Button
    const discordIdBtn = document.getElementById("btn-copy-discord-id");
    if (discordIdBtn) {
        discordIdBtn.addEventListener("click", () => {
            copyToClipboard("1522640778688598286");
        });
    }
}

// 16. FAQ Accordion Component Setup
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (question) {
            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                // Close all others
                faqItems.forEach(i => i.classList.remove("active"));
                
                if (!isActive) {
                    item.classList.add("active");
                }
                AudioSynth.playClick();
            });
        }
    });
}

// 17. Discord Live API Telemetry & Fallback Handler
function fetchDiscordWidgetStatus() {
    const serverNameEl = document.getElementById("discord-server-name");
    const onlineCountEl = document.getElementById("discord-online-count");
    const fallbackBox = document.getElementById("discord-fallback-box");
    const iframeEl = document.getElementById("discord-widget-iframe");

    if (!serverNameEl || !onlineCountEl) return;

    fetch("https://discord.com/api/guilds/1522640778688598286/widget.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("Widget não ativado ou servidor não encontrado");
            }
            return res.json();
        })
        .then(data => {
            if (data.name) serverNameEl.textContent = data.name;
            if (data.presence_count !== undefined) {
                onlineCountEl.textContent = `${data.presence_count} Agente(s) Online`;
            }
            if (fallbackBox) fallbackBox.style.display = "none";
        })
        .catch(err => {
            console.warn("Informação da API do Discord Widget:", err.message);
            serverNameEl.textContent = "QG Tático Blair (Discord)";
            onlineCountEl.textContent = "Status: Aguardando Ativação";
            
            // Check if running on local file:/// protocol or if widget is disabled on Discord
            if (window.location.protocol === "file:" || err.message.includes("não ativado")) {
                if (fallbackBox) fallbackBox.style.display = "flex";
            }
        });
}

// 18. Global HUD Toast Notification System
function showGlobalToast(text, isError = false) {
    const container = document.getElementById("global-toast-notification");
    if (!container) return;

    const toast = document.createElement("div");
    toast.style.cssText = `
        background: ${isError ? 'rgba(239, 68, 68, 0.92)' : 'rgba(14, 16, 26, 0.95)'};
        color: ${isError ? '#fff' : 'var(--accent-blue)'};
        border: 1px solid ${isError ? 'rgba(239, 68, 68, 0.5)' : 'var(--accent-blue)'};
        border-radius: 10px;
        padding: 0.65rem 1.2rem;
        font-size: 0.82rem;
        font-weight: 600;
        box-shadow: 0 0 15px ${isError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 240, 255, 0.3)'};
        backdrop-filter: blur(12px);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: auto;
    `;
    toast.innerHTML = text;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// 19. Tactical Hunt & Cooldown Timer Logic
let timerInterval = null;
let timerSecondsLeft = 30;
let timerTotalSeconds = 30;
let timerMode = "hunt";
let isTimerRunning = false;

function setupHuntTimer() {
    const clockEl = document.getElementById("hunt-timer-clock");
    const phaseLabelEl = document.getElementById("hunt-timer-phase-label");
    const badgeStatusEl = document.getElementById("hunt-timer-badge-status");
    const displayBoxEl = document.getElementById("hunt-timer-display-box");
    const startBtn = document.getElementById("btn-start-hunt-timer");
    const resetBtn = document.getElementById("btn-reset-hunt-timer");
    const presetBtns = document.querySelectorAll(".timer-preset-btn");

    if (!clockEl || !startBtn) return;

    function formatTime(secs) {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateClockDisplay() {
        clockEl.textContent = formatTime(timerSecondsLeft);
    }

    presetBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (isTimerRunning) stopTimer();
            presetBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            timerMode = btn.getAttribute("data-mode");
            timerSecondsLeft = parseInt(btn.getAttribute("data-seconds")) || 30;
            timerTotalSeconds = timerSecondsLeft;

            updateClockDisplay();
            AudioSynth.playClick();

            if (timerMode === "hunt") {
                phaseLabelEl.textContent = "Modo: Caçada Ativa (30s)";
            } else if (timerMode === "cooldown-std") {
                phaseLabelEl.textContent = "Modo: Carência Normal (30s)";
            } else if (timerMode === "cooldown-demon") {
                phaseLabelEl.textContent = "Modo: Carência Demon (20s)";
            } else if (timerMode === "cooldown-smudge") {
                phaseLabelEl.textContent = "Modo: Proteção Smudge (90s)";
            }
        });
    });

    function startTimer() {
        if (isTimerRunning) return;
        isTimerRunning = true;

        startBtn.innerHTML = `<i class="fa-solid fa-pause"></i> PAUSAR`;
        startBtn.style.background = "#ffa500";
        startBtn.style.borderColor = "#ffa500";

        if (timerMode === "hunt") {
            badgeStatusEl.textContent = "🔴 CAÇADA ATIVA! ESCONDAM-SE!";
            badgeStatusEl.style.background = "rgba(255, 0, 85, 0.2)";
            badgeStatusEl.style.borderColor = "var(--accent-red)";
            badgeStatusEl.style.color = "var(--accent-red)";
            clockEl.style.color = "var(--accent-red)";
            clockEl.style.textShadow = "0 0 25px var(--accent-red-glow)";
            displayBoxEl.style.borderColor = "var(--accent-red)";
            
            if (window.transmitMessage) {
                window.transmitMessage("⚠️ **[CRONÔMETRO TÁTICO]** Caçada Iniciada! Contagem de 30s ativada!");
            }
        } else {
            badgeStatusEl.textContent = "🟡 CARÊNCIA EM ANDAMENTO (CONTAGEM)";
            badgeStatusEl.style.background = "rgba(254, 228, 64, 0.15)";
            badgeStatusEl.style.borderColor = "var(--accent-yellow)";
            badgeStatusEl.style.color = "var(--accent-yellow)";
            clockEl.style.color = "var(--accent-yellow)";
            clockEl.style.textShadow = "0 0 25px rgba(254, 228, 64, 0.5)";
            displayBoxEl.style.borderColor = "var(--accent-yellow)";
        }

        AudioSynth.playMysticDraw();

        timerInterval = setInterval(() => {
            timerSecondsLeft--;
            updateClockDisplay();

            if (timerSecondsLeft <= 3 && timerSecondsLeft > 0) {
                AudioSynth.playClick();
            }

            if (timerSecondsLeft <= 0) {
                stopTimer();
                onTimerComplete();
            }
        }, 1000);
    }

    function stopTimer() {
        isTimerRunning = false;
        clearInterval(timerInterval);
        startBtn.innerHTML = `<i class="fa-solid fa-play"></i> INICIAR CRONÔMETRO`;
        startBtn.style.background = "var(--accent-red)";
        startBtn.style.borderColor = "var(--accent-red)";
    }

    function resetTimer() {
        stopTimer();
        timerSecondsLeft = timerTotalSeconds;
        updateClockDisplay();
        badgeStatusEl.textContent = "🟢 AMBIENTE SEGURO DE EXPLORAÇÃO";
        badgeStatusEl.style.background = "rgba(57, 255, 20, 0.1)";
        badgeStatusEl.style.borderColor = "var(--accent-green)";
        badgeStatusEl.style.color = "var(--accent-green)";
        clockEl.style.color = "var(--accent-green)";
        clockEl.style.textShadow = "0 0 25px var(--accent-green-glow)";
        displayBoxEl.style.borderColor = "var(--border-color)";
        phaseLabelEl.textContent = "Aguardando Disparo";
        AudioSynth.playClick();
    }

    function onTimerComplete() {
        badgeStatusEl.textContent = "🟢 CARÊNCIA FINALIZADA! AMBIENTE SEGURO!";
        badgeStatusEl.style.background = "rgba(57, 255, 20, 0.2)";
        badgeStatusEl.style.borderColor = "var(--accent-green)";
        badgeStatusEl.style.color = "var(--accent-green)";
        clockEl.style.color = "var(--accent-green)";
        clockEl.style.textShadow = "0 0 30px var(--accent-green-glow)";
        displayBoxEl.style.borderColor = "var(--accent-green)";

        AudioSynth.playMysticDraw();
        showGlobalToast("🟢 CRONÔMETRO TÁTICO: Carência Finalizada! Ambiente Seguro!");

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance("Atenção! Cronômetro finalizado! Ambiente seguro para exploração.");
            utterance.lang = "pt-BR";
            window.speechSynthesis.speak(utterance);
        }

        if (window.transmitMessage) {
            window.transmitMessage("🟢 **[CRONÔMETRO TÁTICO]** Carência finalizada! Fantasma em resfriamento. Ambiente Seguro!");
        }
    }

    startBtn.addEventListener("click", () => {
        if (isTimerRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    resetBtn.addEventListener("click", resetTimer);
}

// 20. Tactical Radio & Voice Channel Integration
function setupTacticalRadio() {
    const radioBtns = document.querySelectorAll(".radio-transmit-btn");

    radioBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const voiceMsg = btn.getAttribute("data-voice");
            const textMsg = btn.getAttribute("data-text");

            AudioSynth.playClick();

            // 1. Speak message out loud via Browser Speech Synthesis
            if ('speechSynthesis' in window && voiceMsg) {
                const utterance = new SpeechSynthesisUtterance(voiceMsg);
                utterance.lang = "pt-BR";
                utterance.rate = 1.1;
                utterance.pitch = 0.9;
                window.speechSynthesis.speak(utterance);
            }

            // 2. Transmit formatted message to Discord live chat
            if (window.transmitMessage && textMsg) {
                window.transmitMessage(textMsg);
                showGlobalToast("📻 Transmissão de Rádio enviada no Discord!");
            } else if (textMsg) {
                navigator.clipboard.writeText(textMsg).then(() => {
                    showGlobalToast("📋 Mensagem do Rádio copiada! Cole no chat.");
                });
            }
        });
    });
}
