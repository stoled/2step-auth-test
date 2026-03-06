import { Link } from "react-router-dom";
import { Trash2, UserPlus, Loader2, Mail, Calendar } from "lucide-react";
import { type User } from "../api/users";
import { useUsers } from "../hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function UsersPage() {
  const { users, loading, error, deletingId, deleteUser } = useUsers();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Пользователи</h1>
            {!loading && (
              <p className="text-sm text-muted-foreground">
                Всего: {users.length}
              </p>
            )}
          </div>
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Регистрация
            </Link>
          </Button>
        </div>

        {error && (
          <Card className="mb-4 border-destructive">
            <CardContent className="pt-4">
              <p className="text-sm text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Загрузка...</span>
          </div>
        )}

        {!loading && users.length === 0 && !error && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Пока никого нет</p>
              <Button asChild>
                <Link to="/">Зарегистрироваться первым</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && users.length > 0 && (
          <div className="space-y-3">
            {users.map((user: User) => (
              <Card key={user.id}>
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold text-primary text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteUser(user.id)}
                    disabled={deletingId === user.id}
                    className="text-muted-foreground hover:text-destructive flex-shrink-0"
                  >
                    {deletingId === user.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
