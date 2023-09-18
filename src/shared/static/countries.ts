export const countries = [
  {
    code: 'US', value: 'United States', phone: '1',
    postalPattern: /^\b\d{5}\b(?:[- ]{1}\d{4})?$/
  },
  { code: 'RU', value: 'Russian Federation', phone: '7', postalPattern: /^\d{6}$/ },
  { code: 'BY', value: 'Belarus', phone: '375', postalPattern: /^\d{6}$/ },
];

export function getCountryCode(countryName: string) {
  return countries.find((country) => country.value === countryName)?.code || countryName;
}

export function getCountryName(countryCode: string) {
  return countries.find((country) => country.code === countryCode)?.value || countryCode;
}

export function getPostalCodePattern(countryName: string) {
  return countries.find((country) => country.value === countryName)?.postalPattern
}
