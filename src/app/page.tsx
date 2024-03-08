import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface Recipe {
  title: string,
  image: string,
  time: number,
  description: string,
  instructions: string,
  vegan: boolean,
  id: string
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch('http://localhost:4000/recipes')

  // delay response
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return result.json()
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main className="grid grid-cols-3 gap-8">
      {recipes.map(recipe => (
        <Card key={recipe.id} className="flex flex-col justify-between">
          <CardHeader className="flex flex-row gap-4 items-center">
            <Avatar >
              <AvatarImage src={`/img/${recipe.image}`} alt="recipe img" />
              <AvatarFallback >{recipe.title.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div >
              <CardTitle>{recipe.title}</CardTitle>
              <CardDescription>{recipe.time} mins to cook.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p>{recipe.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">View Recipe</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Recipe: {recipe.title}</DialogTitle>
                  <DialogDescription>
                    {recipe.time} mins to cook.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center space-y-2">
                  <p className="italic">{recipe.description}</p>
                  <p dangerouslySetInnerHTML={{__html:recipe.instructions}}/>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {recipe.vegan ? <Badge >Vegan</Badge> : <Badge variant="outline">Non-Vegan</Badge>}
          </CardFooter>
        </Card>
      ))}
    </main>
  );
}
