const baikalImage =     new URL('../../images/galery/galery_baikal.jpg', import.meta.url);
const krimeriaImage =   new URL('../../images/galery/galery_krimeria-semiisland.jpg', import.meta.url);
const baticSeaImage =   new URL('../../images/galery/galery_dunes.jpg', import.meta.url);
const goglandImage =    new URL('../../images/galery/galery_gogland.jpg', import.meta.url);
const ruskealaImage =   new URL('../../images/galery/galery_ruskeala.jpg', import.meta.url);
const volcanoImage =    new URL('../../images/galery/galery_volcano.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Озеро Байкал', 
    link: baikalImage
  },
  {
    name: 'Крымский полуостров', 
    link: krimeriaImage
  },
  {
    name: 'Балтийское море', 
    link: baticSeaImage
  },
  {
    name: 'Остров Гогланд', 
    link: goglandImage
  },
  {
    name: 'Рускеала',
    link: ruskealaImage
  },
  {
    name: 'Корякская Сопка',
    link: volcanoImage
  }
];

export { initialCards };