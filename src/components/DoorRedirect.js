import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DoorRedirect() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [redirecting, setRedirecting] = useState(true);

    useEffect(() => {
        const redirectToRoot = () => {
        navigate('/');
        };

        redirectToRoot();

        // Delay the second redirection
        const redirectBack = setTimeout(() => {
        setRedirecting(false);
        navigate(`/asset/door/${id}`);
        }, 2000);

        return () => clearTimeout(redirectBack);
    }, [id, navigate]);

    useEffect(() => {
        if (!redirecting) {
        navigate(`/asset/door/${id}`);
        }
    }, [redirecting, id, navigate]);

    return null;
    }

export default DoorRedirect;
