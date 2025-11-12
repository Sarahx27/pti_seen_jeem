export interface Question {
  id: number;
  value: number;
  text: string;
  answer: string;
  used: boolean;
  image?: string;        // صورة السؤال (اختياري)
  video?: string;        // فيديو السؤال (اختياري)
  answerImage?: string;  // صورة الإجابة (اختياري) ← الجديد
}


export interface Category {
  id: number;
  name: string;
  image?: string;
  questions: Question[];
}

export interface Team {
  name: string;
  score: number;
  helps: {
    mute: { available: boolean; active: boolean };
    double: { available: boolean; active: boolean };
    friend: { available: boolean; active: boolean };
  };
}

/* قاعدة بيانات هادئة وواضحة: 5 أسئلة فقط لكل فئة، 600 → 200 */
export const initialCategories: Category[] = [
  {
    id: 1,
    name: "العاب الفيديو",
    questions: [
      { id: 1, value: 200, text: "مااسم الشخصية الرئيسية في سلسلة العاب The Legend of Zelda؟",answer: "لينك Link", used: false },
      { id: 2, value: 200, text: "في لعبة Minecraft ، ماللون الأساسي للكريستال الذي يستخدم للحرفة و الإضاءة ", answer: "أحمر ، Redstone ", used: false },
      { id: 3, value: 400, text: "مااسم الشركة اليابانية التي طورت لعبة Final Fantasy؟", answer: "سكوير إنكس Square Enix", used: false },
      { id: 4, value: 400, text: "في لعبة Grand theft Auto ، ما هو اسم الشخصية الرئيسية؟", answer: "مايكل دي سانتا", used: false },
      { id: 5, value: 600, text: "في لعبة Dark Souls مااسم الحدث الخفي الذي يجب ان يحدث لفتح نهاية the dark world ", answer: "يجب أن يختار اللاعب عدم إشعال النار في النهاية، بل إطفاء اللهب الأبدية — وهذا يتطلب عدم التفاعل مع أي من الحراس الثلاثة (Gwyn, Nito, The Witch of Izalith) .بطريقة تؤدي لإعادة إشعال النار، ثم اختيار اختيار الظلام ", used: false },
      { id: 6, value: 600, text: "ما اسم الـDLC الأول للعبة The Witcher 3: Wild Hunt، اللي صدر عام 2016 وفاز بجوائز كتير، ويحكي قصة Ciri؟ ", answer: "Hearts of Stone", used: false },
    ],
  },
  {
    id: 2,
    name: "أفلام هوليوود",
    questions: [
      { id: 1, value: 200, text: "مااسم البيت السحري في هوجوارتس الذي يُعرف بالشجاعة و الجرأة وينتمي إليه هاري بوتر", answer: "جريفندور ، Gryffindor ", used: false },
      { id: 2, value: 200, text: "من هو بطل فيلم The dark knight ", answer: "كريستيان بيل", used: false },
      { id: 3, value: 400, text: "ما اسم الظاهرة الفيزيائية التي تسببت في تباطؤ الزمن بشكل كبير على كوكب ميلر (الكوكب القريب من الثقب الأسود)؟", answer: " تمدد الزمن الجاذبي (Gravitational Time Dilation)", used: false },
      { id: 4, value: 400, text: "من هي الشخصية التي قالت الجملة الشهيرة: I can do this all da  لأول مرة في MCU؟", answer: "ستيف روجرز/ كابتن أمريكا", used: false },
      { id: 5, value: 600, text: "ليه كوب ما يصمم أحلامه بنفسه في فيلم inception؟ ", answer: "لأن خياله عن مال بيدمر كل خططه", used: false },
      { id: 6, value: 600, text: "كيف ماتت عمة ميا في فيلم La La Land؟", answer: "توفت عمة ميا بسبب إدمان الكحول", used: false },
    ],
  },
  {
    id: 3,
    name: "مودرن فاميلي",
    questions: [
      { id: 1, value: 200, text: "ما اسم الحفلة العائلية السنوية التي يصرّ جاي على تنظيمها رغم اعتراض الجميع، وغالبًا ما تنتهي بموقف كوميدي؟", answer: "عيد الشكر (Thanksgiving)", used: false },
      { id: 2, value: 200, text: "ما اسم الزوجة الكولومبية لـ فيل دوني ، التي تتحدث الإنجليزية بلهجة مميزة وتشتهر بحبها للرقص؟", answer: "غلوريا (Gloria)", used: false },
      { id: 3, value: 400, text: "ما اسم الشخصية الخيالية التي ابتكرها فيل دوني ليُقنع بها عائلته أن لديه صديقًا سريًّا في العمل، بعد أن شعر أن الجميع يعتقدون أنه ممل؟", answer: "كليفورد (Clifford) ", used: false },
      { id: 4, value: 400, text: "في اي موسم تزوج ميتشل و كاميرون رسميًا؟", answer: "الموسم 6", used: false },
      { id: 5, value: 600, text: "ما العبارة السرية اللي كان يقولها كام و غلوريا و فيل لما يبغون يجتمعون بدون ما احد يدري؟ ", answer: "نروح نشتري عصير برتقال ", used: false },
      { id: 6, value: 600, text: "ما اسم قطة ليلى وكاميرون وميتشل؟", answer: "لاري ", used: false },
    ],
  },
  {
    id: 4,
    name: "إنمي",
    questions: [
      { id: 1, value: 200, text: "ما اسم الشخصية الرئيسية في أنمي Demon Slayer (Kimetsu no Yaiba)، الذي يرتدي وشاحًا أزرق ويرافقه شيطان يحميه؟", answer: "تانجيرو كامادو (Tanjirou Kamado)", used: false },
      { id: 2, value: 200, text: "في أنمي My Hero Academia ما هي القدرة التي ورثها ميدوريا من معلمه؟", answer: "ون فور اول", used: false },
      { id: 3, value: 400, text: "ما هو اسم القبيلة القديمة التي ينتمي إليها كينغ أحد قادة طاقم كايدو، والتي كانت حكومة العالم تخشى قدرتها على الاشتعال؟", answer: "قبيلة اللوناريان (Lunarian)", used: false },
      { id: 4, value: 400, text: "من هو الشخص الوحيد في جيش الشينيغامي الذي استطاع ان قتل كابتن فرقة خلال اختبار الترقية الرسمي ؟", answer: "كينباتشي زاراكي ", used: false },
      { id: 5, value: 600, text: "من هو الشخص الوحيد الذي استطاع مقاومة أمر جياس مباشر من لولوش، وما السبب؟", answer: "يريميـا غوتوالد بفضل قدرته Geass Canceler التي تعطل أوامر الجياس.", used: false },
      { id: 6, value: 600, text: "من هو الشخص الذي أوقف ناروتو من التحول إلى جميع ذيول التسعة (التحول الكامل إلى كيوبي) أثناء معركته ضد باين؟ ", answer: "امه (كوشينا) وهي اللي وضعت الختم عليه", used: false },
    ],
  },
  {
    id: 5,
    name: "حروف",
    questions: [
      { id: 1, value: 200, text: "ماهي آداة الكتابة القديمة التي كانت تُغمس في الحبر؟", answer: "الريشة", used: false },
      { id: 2, value: 200, text: "ما هو الغاز الغير قابل للإحتراق ويذوب في الماء ويستعمل في عمليات الاطفاء؟ ", answer: "ثاني أكسيد الكربون", used: false },
      { id: 3, value: 400, text: "تقال على الدواب على السير والارتحال", answer: "ظعن", used: false },
      { id: 4, value: 400, text: "من اسماء النمر؟", answer: "ببر", used: false },
      { id: 5, value: 600, text: "ما اسم العالم الذي اخترع محرك الاحتراق الداخلي؟", answer: "جوتليب دايملر", used: false },
      { id: 6, value: 600, text: "ا اسم المنظمة العلمية التي تدير أكبر مصادم جسيمات في العالم في سويسرا؟", answer: "CERN ، سيرن ", used: false },
    ],
  },

  // 6) نظم التشغيل (جديدة)
  {
    id: 6,
    name: "معلومات عامة ",
    questions: [
      { id: 1, value: 200, text: "طبيق للتواصل الاجتماعي يضيف خاصية Story", answer: "سناب شات ، Snapchat", used: false },
      { id: 2, value: 200, text:"ماهي الخلايا الأطول في جسم الانسان؟", answer: "الخلايا العصبية", used: false },
      { id: 3, value: 400, text: "مااسم العلم الذي يهتم بدراسة البحار و المحيطات ؟ ", answer: "Oceanography", used: false },
      { id: 4, value: 400, text: "ماهي العملة الوطنية لدولة تونس ؟", answer: "دينار تونسي", used: false },
      { id: 5, value: 600, text: "<كم عدد الدول المعترف بها في جنوب أفريقيا <رقم ", answer: "54", used: false },
      { id: 6, value: 600, text: "ماهي وحدة قياس ضغط الدم؟", answer: "ملم زئبق ، mmHg", used: false },
    ],
  },
  // PTI 
  {
    id: 7,
    name: "كرة القدم",
    questions: [
      { id: 1, value: 200, text: "نادي اشتهر بأنه أفضل نادي بتاريخ كرة القدم من هو؟", answer: "مانشستر يونايتد", used: false },
      { id: 2, value: 200, text: "كم بريميرليغ يمتلك نادي ليفربول؟ ", answer: "2", used: false },
      { id: 3, value: 400, text: "متى كانت اول مره يترشح فيها نيمار لكأس العالم ؟", answer: "2011", used: false },
      { id: 4, value: 400, text: "من أي نادي انتقل اللاعب ستيفاو الى تشيلسي ؟", answer: "بالميراس البرازيلي", used: false },
      { id: 5, value: 600, text: "خمس لاعبين حققوا دوري الأبطال (٦) مرات، من هم؟ ", answer: "باكو خينتو - توني كروس - لوكا مودريتش- ناتشو فيرنانديز- داني كارفاخال ", used: false },
      { id: 6, value: 600, text: "من أول لاعب حقق الحذاء الذهبي مرتين ؟", answer: "هنري", used: false },
    ],
  },
// 8) نظم التشغيل (جديدة

  {
    id: 8,
    name: "دول و عواصم ",
    questions: [
      { id: 1, value: 200, text: "ماهي عاصمة كندا ؟", answer: "أوتاوا", used: false },
      { id: 2, value: 200, text: "ماهي الدولة التي تعتبر براغ عاصمتها؟", answer: "التشيك", used: false },
      { id: 3, value: 400, text: "هذي عاصمة اي دولة ؟ " ,image : "/media/country400.png"  , answer: "ماليزيا", used: false },
      { id: 4, value: 400, text: "هذي عاصمة اي دولة ؟ " ,image : "/media/china.png", answer: "بكين", used: false },
      { id: 5, value: 600, text: "مالدولة التي تقع عاصمتها خارج حدودها البرية تمامًا وهي جزيرة منفصله تمامًا ؟ ", answer: "غينيا الاستوائية (العاصمة الحالية مالابو تقع بجزيرة بيوكو بعيد عن البر الرئيسي)", used: false },
      { id: 6, value: 600, text: "ما عاصمة هذه الدولة ؟ ", image: "/media/country600.png", answer: "بودابست", used: false },
    ],
  },

  {
    id: 9,
    name: "ميك اب",
    questions: [
      { id: 1, value: 200, text: "ماهي درجة لون روج كيكو الي انشهر قبل فتره ؟", answer: "103", used: false },
      { id: 2, value: 200, text: "ماهي جنسية صاحبة براند هدى بيوتي ؟", answer: "أمريكية الجنسية ", used: false },
      { id: 3, value: 400, text: "ماهو اسم صاحبة هذا البراند ؟",image : "/media/hely.png", answer: "هايلي بيبر ", used: false },
      { id: 4, value: 400, text: "هذا المنتج من اي براند ؟ ",image: "/media/mrio.png", answer: "ميك اب باي ماريو", used: false },
      { id: 5, value: 600, text: "ماهو اسم هذا البراند ؟ ", image: "/media/charlot.png", answer: "شارلوت تولبيري", used: false },
      { id: 6, value: 600, text: "اين يقع هذا الفرع من قلوسيير ؟", image: "/media/gloseer.png", answer: "كونفت جاردن - لندن", used: false },
    ],
  },

  {
    id: 10,
    name: "PTI",
    questions: [
      { id: 1, value: 200, text: "مامعنى شعار النادي ؟ ", answer: "الحروف المتشابكة ترمز لمعنى التعاون و انه مصدر قوه النادي و رمز المخ يعبر عن المعرفة و الإبداع ", used: false },
      { id: 2, value: 200, text: "من هم ليدرز النادي ؟ ", answer: "جواهر ،طلال ، علي ، ياسمين ، مريم ، سارة ", used: false },
      { id: 3, value: 400, text: "ماهي اخر نوفا نزلت مع نبذه بسيطة ", answer: "عن الدوريات الدرون ", used: false },
      { id: 4, value: 400, text: "في أي عام تأسس نادي التعلم بالأقران ؟ ", answer: "2021", used: false },
      { id: 5, value: 600, text: "كم لجنة كان يحوي النادي في السابق مع ذكر اسماءهم", answer: " لجنتين ،الميديا و المعلمين  ", used: false },
      { id: 6, value: 600, text: "كم عدد فولورز النادي في منصة X +1 , -1", answer: "739 فولورز", used: false },
    ],
  },

  {
    id: 11,
    name: "براندات",
    questions: [
      { id: 1, value: 200, text: "براند فرنسي مشهور بشنطه الكلاسيكية و شعاره عبارة عن حرفين متشابكين ", answer: "لويس فيتون . louis vuitton", used: false },
      { id: 2, value: 200, text: "شعار اي براند ؟",image:"/media/marseds.png", answer: "مرسيدس بنز", used: false },
      { id: 3, value: 400, text: "براند عطور معروف بعطر Bloom ", answer: "قوتشي ، gucci", used: false },
      { id: 4, value: 400, text: "شعار اي براند ؟", image: "/media/redbull.png", answer: "ريد بل ،Red Bull", used: false },
      { id: 5, value: 600, text: "براند فرنسي للشنط الفخمة اسمه مرتبط بالاصل في صناعه السروج ", answer: "هيرميس ، Hermes", used: false },
      { id: 6, value: 600, text: "براند اجهزه عالمي يتميز بدقة في تفاصيل اجهزته ",  answer: "ابل ، Apple", used: false },

    ],
  },

  {
    id: 12,
    name: "ولا كلمة",
    questions: [
      { id: 1, value: 200, text: "ماهي الكلمة التي تعني لا شيء ؟", answer: "لا شيء", used: false },
      { id: 2, value: 200, text: "ماهي الكلمة التي تعني عدم وجود شيء ؟", answer: "عدم وجود", used: false },
      { id: 3, value: 400, text: "ماهي الكلمة التي تعني الفراغ ؟", answer: "فراغ", used: false },
      { id: 4, value: 400, text: "ماهي الكلمة التي تعني العدم ؟", answer: "عدم", used: false },
      { id: 5, value: 600, text: "ماهي الكلمة التي تعني اللاشيء ؟", answer: "لا شيء", used: false },
      { id: 6, value: 600, text: "ماهي الكلمة التي تعني الخواء ؟", answer: "خواء", used: false },

    ],
  },

  {
    id: 13,
    name: "فريندز",
    questions: [
      { id: 1, value: 200, text: "مين كان يعمل في سنترال بيرك و يحب القهوه ؟ ", answer: "تشاندلر", used: false },
      { id: 2, value: 200, text: "مين الشخصية المشهوره بجمله (We were on a break)؟", answer: "روس ، Ross", used: false },
      { id: 3, value: 400, text: "مين كانت تعمل في متجر الأزياء وتشرب قهوه من المايكرويف ؟", answer: "رايتشل ، Rachel", used: false },
      { id: 4, value: 400, text: "مين الشخص الي عنده خوف من الإلتزام ويحب المزاح كثير ؟", answer: "تشاندلر ، Chandler", used: false },
      { id: 5, value: 600, text: "مين كان يغني و يعزف عالقيتار في بعض الحلقات ؟ ", answer: "روس ، Ross", used: false },
      { id: 6, value: 600, text: "مين الشخصية الي يملك قطه اسمها smelly cat؟", answer: "فيبي ، Phoebe", used: false },

    ],
  },

  {
    id: 14 ,
  name: "مين المشهور ؟ ",
    questions: [
      { id: 1, value: 200, text: "من هو المشهور ؟", image:"/media/AbdoAi.png", answer: "محمد عبدو ", answerImage: "/media/Abdo.png", used: false },
      { id: 2, value: 200, text: "من هو المشهور ؟",image: "/media/rabeahAi .png", answer: "أبو ربيعه", answerImage : "/media/rabeah.png" , used: false },
      { id: 3, value: 400, text: "من هو المشهور ؟",image:"/media/shgeryAi.png" , answer: "احمد الشقيري",answerImage:"/media/shgery.png" , used: false },
      { id: 4, value: 400, text: "من هو المشهور",image: "/media/decabrioAi.png", answer: "ليناردو ديكابريو ",  answerImage: "/media/decabrio.png" ,used: false },
      { id: 5, value: 600, text: "من هو المشهور",image:"/media/AnghamAi.png", answer: "أنغام",answerImage:"/media/Angham.png", used: false },
      { id: 6, value: 600, text: "ما هو اسم هذا الفلم ؟",image: "/media/jokerAi.png", answer: "الجوكر ", answerImage: "/media/joker.png", used: false },
    ],
  },  

  {
    id: 15,
    name: "أعلام",
    questions: [
      { id: 1, value: 200, text: "علم أي دولة ؟", image:"/media/gzaer.png", answer: "الجزائر", used: false },
      { id: 2, value: 200, text: "علم أي دولة ؟", image:"/media/nerweej.png", answer: "النرويج", used: false },
      { id: 3, value: 400, text: "علم أي دولة ؟", image:"/media/boland.png", answer: "بولندا", used: false },
      { id: 4, value: 400, text: "علم أي دولة ؟", image:"/media/tccek.png", answer: "التشيك", used: false },
      { id: 5, value: 600, text: "علم أي دولة ؟", image:"/media/vasco.png", answer: " بونفينو فاسكو", used: false },
      { id: 6, value: 600, text: "علم أي دولة ؟", image:"/media/mager.png", answer: "المجر", used: false },
    ],
  },


];

