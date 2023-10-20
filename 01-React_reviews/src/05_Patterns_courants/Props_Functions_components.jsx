export const Calcul = ({ nb1, nb2, operation }) => {
  // const handleClick = () => {
  //   if (operation === '+') {
  //     return (
  //       <div>
  //         <p>
  //           la somme de {nb1} et {nb2} est {nb1 + nb2}
  //         </p>
  //       </div>
  //     )
  //   } else if (operation === '-') {
  //     return `la soustraction de ${nb1} et ${nb2} est ${nb1 - nb2}`
  //   } else if (operation === '*') {
  //     return `la multiplication de ${nb1} et ${nb2} est ${nb1 * nb2}`
  //   } else if (operation === '/') {
  //     return `la division de ${nb1} et ${nb2} est ${nb1 / nb2}`
  //   }
  //   return 'Please select a correct operation'
  // }
  if (operation === '+') {
    return (
      <div>
        <p>
          la somme de {nb1} et {nb2} est {nb1 + nb2}
        </p>
      </div>
    )
  } else if (operation === '-') {
    return `la soustraction de ${nb1} et ${nb2} est ${nb1 - nb2}`
  } else if (operation === '*') {
    return `la multiplication de ${nb1} et ${nb2} est ${nb1 * nb2}`
  } else if (operation === '/') {
    return `la division de ${nb1} et ${nb2} est ${nb1 / nb2}`
  } else {
    return 'Please select a correct operation'
  }
}
