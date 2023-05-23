import styles from './card.module.scss';
const Card = ({ e }) => {
    return (
        <div className={styles.cat}>
            <div className={styles.image}></div>
            <div>
                <div>name:</div>
                <span>{e.name}</span>
            </div>
            <div>
                <div>breeds:</div>
                <span>{e.breeds}</span>
            </div>
            <div>
                <div>age:</div>
                <span>{e.age}</span>
            </div>
            <div>
                <div>gender:</div>
                <span>{e.gender}</span>
            </div>
        </div>
    );
};
export default Card;
