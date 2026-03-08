import crypto from 'crypto'
function generateUUID(){
    return crypto.randomUUID()
}
export default generateUUID