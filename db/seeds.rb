p "seeds started"

User.destroy_all

users = User.create([
  {
    email: 'John.Doe@qeddev.com',
    first_name: 'John',
    last_name: 'Doe',
    password: '123456',
    street_and_number: 'Amstelkade 1',
    postalcode: '',
    city: 'Amsterdam',
    phonenumber: '654654654'
  },
  {
    email: 'jansen@qeddev.com',
    first_name: 'Jan',
    last_name: 'Jansen',
    password: '123456',
    street_and_number: 'Kalverstraat 1',
    postalcode: '',
    city: 'Amsterdam',
    phonenumber: '65465465489795',
    lat: 4.81,
    lng: 52.31,
  },
  {
    email: 'pietersen@qeddev.com',
    first_name: 'Piet',
    last_name: 'Pietersen',
    password: '123456',
    street_and_number: 'Hoofdstraat 12',
    postalcode: '',
    city: 'Apeldoorn',
    phonenumber: '65465465489795',
    lat: 4.83,
    lng: 52.33,
  },
  {
    email: 'goofy@qeddev.com',
    first_name: 'Goofy',
    last_name: 'Dog',
    password: '123456',
    street_and_number: 'Akerstraat 21',
    postalcode: '',
    city: 'Heerlen',
    phonenumber: '65465465489795',
    lat: 4.85,
    lng: 52.30,
  },
  {
    email: 'Duck@qeddev.com',
    first_name: 'Donald',
    last_name: 'Duck',
    password: '123456',
    street_and_number: 'Coolsingel 3',
    postalcode: '',
    city: 'Rotterdam',
    phonenumber: '65465465489795',
    lat: 4.86,
    lng: 52.35,
  },
])

p "seeds done"
