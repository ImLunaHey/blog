import { blog } from '../config';
import { Text } from './text';

export const PostDate: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <Text
      inline
      title={new Date()
        .toLocaleString(blog.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        .toString()}
    >
      {new Date(date).toLocaleDateString(blog.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </Text>
  );
};
