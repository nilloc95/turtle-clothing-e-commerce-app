import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './header.scss';
import { ReactComponent as Logo} from '../../assets/Summer_01.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { createStructuredSelector} from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'


const Header = ({ currentUser, hidden, getRidOfDropdown }) => (
    <div onClick={getRidOfDropdown} className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/'>
                HOME
            </Link>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
                :
                    <Link className='option' to='/login'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
           hidden ? null : (<CartDropdown/>)
        }
            
    </div>
)


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);