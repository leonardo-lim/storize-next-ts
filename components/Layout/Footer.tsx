import styled from 'styled-components';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Foo = styled.footer`
    background-image: linear-gradient(45deg, #bfbe58, #dad992);
    color: #fff;
    padding: 50px 0;
    position: relative;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    .copyright {
        margin-bottom: 20px;
        font-size: 18px;
    }

    .icon {
        width: 35px;
        height: 35px;
        margin: 0 20px;
        display: inline-block;
        line-height: 35px;
        border-radius: 10px;
    }

    .icon:hover {
        background-color: #fff;
    }

    .icon:hover a {
        color: #bfbe58;
    }

    .icon a {
        color: #fff;
        font-size: 20px;
    }
`;

const Footer: React.FC = () => {
    return (
        <Foo>
            <p className="copyright" id="copyright">Copyright &copy; {new Date().getFullYear()}, Storize.</p>
            <div className="icon">
                <a href="https://www.linkedin.com/in/leonardo-lim" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
            <div className="icon">
                <a href="https://www.github.com/leonardo-lim" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            </div>
            <div className="icon">
                <a href="https://www.instagram.com/leonardo.lim_" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
        </Foo>
    );
};

export default Footer;
