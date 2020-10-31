import { AiOutlineMobile } from 'react-icons/ai'
import { BsHouseDoor } from 'react-icons/bs'
import { FiMonitor } from 'react-icons/fi'
import { FaDog } from 'react-icons/fa'
import { BiCar, BiBed } from 'react-icons/bi'
import { RiMotorbikeLine, RiTShirt2Line } from 'react-icons/ri'
import { IoMdBusiness } from 'react-icons/io'
import { GiTennisRacket } from 'react-icons/gi'
import { GrServices} from 'react-icons/gr'
import { MdBusinessCenter, MdChildFriendly } from 'react-icons/md'

const noUser = {
    userPrimary: "https://firebasestorage.googleapis.com/v0/b/sellit-928cd.appspot.com/o/images%2Fuser.jpg?alt=media&token=74e7ace2-9099-4b13-9167-edc90d4bc9e4",
    userSecondary: "https://firebasestorage.googleapis.com/v0/b/sellit-928cd.appspot.com/o/images%2Fuser%20-%20secondary.png?alt=media&token=c1ce91af-9ae3-4b48-a1ce-a49c9586d4eb"
}
const categories = {
    "Mobiles": AiOutlineMobile,
    "Vehicles": BiCar,
    "Property": BsHouseDoor,
    "Electronics & Home Appliances": FiMonitor,
    "Bikes": RiMotorbikeLine,
    "Business, Industrial & Agriculture": IoMdBusiness,
    "Services": GrServices,
    "Jobs": MdBusinessCenter,
    "Animals": FaDog,
    "Furniture & Home Decor": BiBed,
    "Fashion & Beauty": RiTShirt2Line,
    "Books, Sports & Hobbies": GiTennisRacket,
    "Kids": MdChildFriendly
}
export { noUser, categories }