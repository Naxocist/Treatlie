import { ref, remove } from "firebase/database"
import { ISOtoString } from "../js/utils"
import { db } from "../js/firebase"

import closeIcon from '../assets/close-red-icon.svg'

function Packet({hash, packet, uid}) {

    const handleRemovePacket = () => {
        remove(ref(db, `patients/${uid}/packets/${hash}`))
    }

    return (
        <div className='packet-wrap'>
            {ISOtoString(packet['created'])}
            {/* <button className='btn-close' onClick={handleRemovePacket}> */}
                <div className='close-wrap'>
                    <img src={closeIcon}></img>
                </div>
            {/* </button> */}
        </div>
    )
}

export default Packet
