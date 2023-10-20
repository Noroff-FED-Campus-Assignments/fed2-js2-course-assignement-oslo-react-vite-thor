import './postbtn.css';

export default function PostBtn() {
    return (
        <div className="postbtn-container">
            <button id="PostBtn" className="add-post-btn">
                <img className='btn-icon' src="../src/assets/btn-icon.png" alt="" />
            </button>
        </div>
    );
}