import styles from './cats.module.scss';
import Card from './card';
import ToolBar from './toolBar';
const Cats = ({ data, setData }) => {
    return (
        <>
            <div className='container'>
                <ToolBar setData={setData} />
                <div className={styles.catsWrapper}>
                    {data?.map((e, i) => {
                        return (
                            <Card
                                e={e}
                                key={i}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default Cats;
