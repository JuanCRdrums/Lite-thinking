import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "./API";

const AddCompany = ({onAdd}) => {
    const [companyId, setCompanyId] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nit, setNit] = useState("");
    const [phone, setPhone] = useState("");
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        refreshCompanies();
    }, []);

    const refreshCompanies = () => {
        API.get("/").then((res) => {
            setCompanies(res.data);
        }).catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = {name, address, nit, phone};
        API.post("/", item).then(() => refreshCompanies());
    };

    const onUpdate = (id) => {
        let item = {name, address, nit, phone};
        API.patch(`/${id}/`, item).then((res) => refreshCompanies());
    };

    const onDelete = (id) => {
        let item = {name};
        API.delete(`/${id}/`, item).then((res) => refreshCompanies());
    };

    function selectCompany(id){
        let item = companies.filter((company) => company.id === id)[0];
        setCompanyId(id);
        setName(item.name);
        setAddress(item.address);
        setNit(item.nit);
        setPhone(item.phone);
    };

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <h3 className="float-left">Crear una empresa nueva</h3>
                    <Form onSubmit={onSubmit} className="mt-4">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="Ingrese el nombre de la empresa"
                            value={name}
                            onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="Ingrese la dirección de la empresa"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNit">
                            <Form.Label>NIT</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="Ingrese el NIT de la empresa"
                            value={nit}
                            onChange={(e) => setNit(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="Ingrese el teléfono de la empresa"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}></Form.Control>
                        </Form.Group>

                        <div className="float-right">
                            <Button
                            variant="primary"
                            type="submit"
                            onClick={onSubmit}
                            className="mx-2">
                                Crear
                            </Button>

                            <Button
                            variant="primary"
                            type="submit"
                            onClick={onUpdate(companyId)}
                            className="mx-2">
                                Actualizar
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="col-md-8 m">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">NIT</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company, index) => {
                                return (
                                    <tr key="">
                                        <th scope="row">{company.id}</th>
                                        <td>{company.name}</td>
                                        <td>{company.address}</td>
                                        <td>{company.nit}</td>
                                        <td>{company.phone}</td>
                                        <td>
                                            <Button variant="primary"
                                            onClick={() => {selectCompany(company.id);}}>Editar</Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => onDelete(company.id)}
                                            >Eliminar</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddCompany;