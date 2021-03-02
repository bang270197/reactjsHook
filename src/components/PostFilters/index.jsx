import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func
};

PostFiltersForm.defaultProps = {
    onSubmit: null
}

function PostFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);
    function handleSearchTermCHange(e){

        const value = e.target.value;

        setSearchTerm(value);
        if(!onSubmit) return;

        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValue ={
                searchTerm: value
            };
            onSubmit(formValue);
        }, 300)


       
    }
    return (
        <form>
            <label>Nhập dữ liệu cần tìm kiếm</label>
            <input
             type="text"
             value={searchTerm}
             onChange={handleSearchTermCHange}
            />
        </form>
    );
}

export default PostFiltersForm;