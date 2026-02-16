import { getMenu } from '@/lib/store';
import MenuItem from './MenuItem';
import styles from './MenuDisplay.module.css';

async function getMenuItems() {
    // Direct data access for Server Components
    return await getMenu();
}

export default async function MenuDisplay() {
    const menuItems = await getMenuItems();

    if (menuItems.length === 0) {
        return <div className={styles.empty}>Loading menu...</div>;
    }

    return (
        <div className={styles.grid}>
            {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
            ))}
        </div>
    );
}
