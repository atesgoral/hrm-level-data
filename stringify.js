require( './polyfills' )

const isPrimitive = obj =>
  obj === null ||
    [ 'string', 'number', 'boolean' ].includes( typeof obj )

const isArrayOfPrimitive = obj =>    
  Array.isArray( obj ) && obj.every( isPrimitive )

const format = arr => 
  `^^^[ ${
    arr.map( val => JSON.stringify( val ) ).join( ', ' )
  } ]`

  
const replacer = ( key, value ) =>
  isArrayOfPrimitive( value ) ? format( value ) : value
  
const expand = str =>
  str.replace( 
    /("\^\^\^)(\[ .* \])(\")/g, ( match, p1, p2 ) => 
      p2.replace( /\\"/g, '"' )
  )
  
const stringify = obj =>
  expand( JSON.stringify( obj, replacer, 2 ) )
  
module.exports = stringify