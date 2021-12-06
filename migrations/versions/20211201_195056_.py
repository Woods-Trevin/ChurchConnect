"""empty message

Revision ID: d20143f655b1
Revises: 
Create Date: 2021-12-01 19:50:56.440720

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd20143f655b1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('videoURL', sa.String(length=500), nullable=False),
    sa.Column('serviceDay', sa.String(length=25), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('imageURL', sa.String(length=700), nullable=True),
    sa.Column('imageURLTwo', sa.String(length=700), nullable=True),
    sa.Column('imageURLThree', sa.String(length=700), nullable=True),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('startDate', sa.Date(), nullable=False),
    sa.Column('endDate', sa.Date(), nullable=False),
    sa.Column('startTime', sa.Time(), nullable=False),
    sa.Column('endTime', sa.Time(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('prayer_requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profilePicture', sa.String(length=500), nullable=True),
    sa.Column('location', sa.String(length=100), nullable=False),
    sa.Column('home_church', sa.String(length=100), nullable=False),
    sa.Column('bio', sa.String(length=500), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=400), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('replies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=400), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('comment_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('replies')
    op.drop_table('comments')
    op.drop_table('profiles')
    op.drop_table('prayer_requests')
    op.drop_table('events')
    op.drop_table('users')
    op.drop_table('services')
    # ### end Alembic commands ###