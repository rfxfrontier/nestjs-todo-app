import { Column, Entity, Index } from 'typeorm';

@Index('status', ['status'], {})
@Index('priority', ['priority'], {})
@Index('due_date', ['dueDate'], {})
@Index('creation_time', ['creationTime'], {})
@Index('last_updated_time', ['lastUpdatedTime'], {})
@Entity('todo_item', { schema: 'todo_app' })
export class TodoItem {
    @Column('varchar', { primary: true, name: 'item_id', length: 100 })
    itemId: string;

    @Column('varchar', { name: 'name', length: 256 })
    name: string;

    @Column('varchar', { name: 'description', nullable: true, length: 4096 })
    description: string | null;

    @Column('int', { name: 'status', default: () => "'0'" })
    status: number;

    @Column('timestamp', { name: 'due_date', nullable: true })
    dueDate: Date | null;

    @Column('int', { name: 'priority', default: () => "'20'" })
    priority: number;

    @Column('varchar', { name: 'created_by', length: 255 })
    createdBy: string;

    @Column('timestamp', {
        name: 'creation_time',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationTime: Date;

    @Column('varchar', { name: 'last_updated_by', length: 255 })
    lastUpdatedBy: string;

    @Column('timestamp', {
        name: 'last_updated_time',
        default: () => 'CURRENT_TIMESTAMP',
    })
    lastUpdatedTime: Date;

    @Column('tinyint', { name: 'is_deleted', width: 1, default: () => "'0'" })
    isDeleted: boolean;
}
