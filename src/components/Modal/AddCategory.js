/**
 * Child component for Modal to add a category.
 *
 * @param setModal Set's the modal to render in viewport
 * @param refetch Refetch the data to update dashboard
 * @param setLoading Displays the loading icon in button
 */

import TextField from "./Inputs/TextField";
import { gql, useMutation } from "@apollo/client";

const ADD_CATEGORY = gql`
    mutation AddCategory($name: String!) {
        createCategory(data: { name: $name }) {
            url
        }
    }
`;

function AddCategory({ setLoading, setModal, refetch }) {
    const [categoryName, setCategoryName] = React.useState("");
    const [error, setError] = React.useState(false);
    const [addCategory, { data, loading: mutationLoading, error: mutationError }] = useMutation(
        ADD_CATEGORY
    );

    React.useEffect(() => {
        if (mutationLoading) {
            setLoading(true);
        }
        if (!mutationLoading) {
            setLoading(false);
        }
        // Successfully added page
        if (data && !mutationError) {
            setModal(null);
            refetch();
        }
    });

    function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        if (categoryName === "") {
            setError(true);
            setLoading(false);
        } else {
            addCategory({
                variables: { name: categoryName },
            });
            setError(false);
        }
    }

    return (
        <div>
            <form id="modalForm" onSubmit={onSubmit}>
                <TextField
                    label="Category Name"
                    error={error}
                    setValue={setCategoryName}
                    value={categoryName}
                    id="categoryName"
                />
            </form>
        </div>
    );
}

export default AddCategory;
