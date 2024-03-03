import { Column, Entity, Index } from 'typeorm';

@Index('user_name', ['userName'], { unique: true })
@Index('email_address', ['emailAddress'], { unique: true })
@Index('status', ['status'], {})
@Entity('user', { schema: 'todo_app' })
export class User {
    @Column('varchar', { primary: true, name: 'user_id', length: 100 })
    userId: string;

    @Column('varchar', {
        name: 'user_name',
        nullable: true,
        unique: true,
        length: 256,
    })
    userName: string | null;

    @Column('varchar', {
        name: 'email_address',
        nullable: true,
        unique: true,
        length: 2048,
    })
    emailAddress: string | null;

    @Column('int', { name: 'status', default: () => "'1'" })
    status: number;

    @Column('varchar', { name: 'role', length: 32, default: () => "'NORMAL'" })
    role: string;

    @Column('varchar', { name: 'password', nullable: true, length: 256 })
    password: string | null;

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
